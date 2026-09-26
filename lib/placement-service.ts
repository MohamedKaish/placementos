/**
 * PlacementOS - High-Level Unified Service Facade for Team 2
 * Clean, department-agnostic, typed service functions.
 * Team 2 consumes these functions without coupling to internal engine algorithms.
 */

import { Department, JobRole, Skill } from '@/types/skill-graph';
import { EvidenceItem, StudentClaimedSkill } from '@/types/evidence';
import {
  AssessmentQuestion,
  AssessmentSession,
  AssessmentResult,
  AdaptiveStepResult,
  StudentQuestionConfidence
} from '@/types/assessment';
import { RoleReadinessReport, SkillGapAnalysis } from '@/types/scoring';
import { PreparationMission } from '@/types/mission';
import { ReassessmentResult, ScoreHistoryPoint, LearningVelocityResult } from '@/types/reassessment';

import { defaultSkillGraph, SkillGraph } from '@/lib/skill-graph';
import { EvidenceEngine } from '@/lib/evidence-engine';
import { ScoringEngine, UserSkillEvaluationState } from '@/lib/scoring';
import { defaultAssessmentEngine, AssessmentEngine } from '@/lib/assessment-engine';
import { MissionEngine } from '@/lib/missions';
import { ReassessmentEngine } from '@/lib/reassessment';
import { geminiClient, ParsedResumeOutput } from '@/lib/ai/client';

export class PlacementService {
  private skillGraph: SkillGraph;
  private assessmentEngine: AssessmentEngine;
  private activeSessions: Map<string, AssessmentSession>;

  constructor(
    customSkillGraph: SkillGraph = defaultSkillGraph,
    customAssessmentEngine: AssessmentEngine = defaultAssessmentEngine
  ) {
    this.skillGraph = customSkillGraph;
    this.assessmentEngine = customAssessmentEngine;
    this.activeSessions = new Map();
  }

  // =========================================================================
  // 1. TAXONOMY & ROLE QUERIES (Department-Agnostic)
  // =========================================================================

  public getDepartments(): Department[] {
    return this.skillGraph.getAllDepartments();
  }

  public getDepartmentByCode(code: string): Department | undefined {
    return this.skillGraph.getDepartmentByCode(code);
  }

  public getJobRoles(): JobRole[] {
    return this.skillGraph.getAllJobRoles();
  }

  public getJobRoleById(roleId: string): JobRole | undefined {
    return this.skillGraph.getJobRoleById(roleId);
  }

  public getSkillsForRole(roleId: string): {
    skill: Skill;
    weight: number;
    minimumLevel: number;
    critical: boolean;
  }[] {
    const role = this.getJobRoleById(roleId);
    if (!role) return [];

    return role.requirements
      .map((req) => {
        const skill = this.skillGraph.getSkillById(req.skillId);
        if (!skill) return null;
        return {
          skill,
          weight: req.weight,
          minimumLevel: req.minimumLevel,
          critical: req.critical
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }

  // =========================================================================
  // 2. RESUME EXTRACTION (Linguistic AI Integration)
  // =========================================================================

  public async extractResumeSkills(rawResumeText: string): Promise<ParsedResumeOutput> {
    return geminiClient.parseResumeText(rawResumeText);
  }

  // =========================================================================
  // 3. ADAPTIVE DIAGNOSTIC ASSESSMENT
  // =========================================================================

  public startAssessment(
    userId: string,
    skillId: string,
    roleId?: string,
    initialDifficulty: number = 2
  ): { session: AssessmentSession; firstQuestion?: AssessmentQuestion } {
    const session = this.assessmentEngine.startSession(userId, skillId, roleId, initialDifficulty);
    this.activeSessions.set(session.sessionId, session);
    const firstQuestion = this.assessmentEngine.getNextQuestion(session);
    return { session, firstQuestion };
  }

  public submitAnswer(
    sessionId: string,
    questionId: string,
    selectedOptionId: string,
    confidenceRating: StudentQuestionConfidence = 'high',
    timeSpentSeconds: number = 30
  ): {
    stepResult: AdaptiveStepResult;
    nextQuestion?: AssessmentQuestion;
    isFinished: boolean;
  } {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found.`);
    }

    const { session: updatedSession, stepResult } = this.assessmentEngine.processAnswer(session, {
      sessionId,
      questionId,
      selectedOptionId,
      confidenceRating,
      timeSpentSeconds
    });

    const nextQuestion = this.assessmentEngine.getNextQuestion(updatedSession);
    const isFinished = nextQuestion === undefined || updatedSession.history.length >= 5;

    if (isFinished) {
      updatedSession.isCompleted = true;
      updatedSession.completedAt = new Date().toISOString();
    }

    this.activeSessions.set(sessionId, updatedSession);
    return { stepResult, nextQuestion: isFinished ? undefined : nextQuestion, isFinished };
  }

  public finalizeAssessment(sessionId: string): {
    result: AssessmentResult;
    evidenceItem: EvidenceItem;
  } {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found.`);
    }

    const skill = this.skillGraph.getSkillById(session.targetSkillId);
    const skillName = skill ? skill.name : session.targetSkillId;

    const finalized = this.assessmentEngine.finalizeSession(session, skillName);
    this.activeSessions.delete(sessionId);
    return finalized;
  }

  // =========================================================================
  // 4. DIAGNOSTIC PIPELINE: CLAIMED vs DEMONSTRATED vs REQUIRED
  // =========================================================================

  public evaluateReadiness(
    roleId: string,
    userEvidenceItems: EvidenceItem[],
    claimedSkills?: Record<string, StudentClaimedSkill>
  ): RoleReadinessReport {
    const role = this.getJobRoleById(roleId);
    if (!role) {
      throw new Error(`Role ${roleId} not found.`);
    }

    // Group evidence items by skillId
    const evidenceBySkill: Record<string, EvidenceItem[]> = {};
    for (const item of userEvidenceItems) {
      if (!evidenceBySkill[item.skillId]) evidenceBySkill[item.skillId] = [];
      evidenceBySkill[item.skillId].push(item);
    }

    // Calculate demonstrated levels for all required skills
    const demonstratedSkills: UserSkillEvaluationState['demonstratedSkills'] = {};
    for (const req of role.requirements) {
      const items = evidenceBySkill[req.skillId] || [];
      const evaluated = EvidenceEngine.calculateDemonstratedLevel(items);
      demonstratedSkills[req.skillId] = {
        level: evaluated.level,
        confidence: evaluated.confidence
      };
    }

    const evaluationState: UserSkillEvaluationState = {
      demonstratedSkills,
      claimedSkills
    };

    return ScoringEngine.evaluateRoleReadiness(
      role,
      evaluationState,
      (id) => this.skillGraph.getSkillById(id)?.name || id
    );
  }

  // =========================================================================
  // 5. TARGETED MISSIONS
  // =========================================================================

  public generateMissions(
    userId: string,
    roleId: string,
    skillGaps: SkillGapAnalysis[],
    availableHours: number = 10
  ): PreparationMission[] {
    const role = this.getJobRoleById(roleId);
    const roleTitle = role ? role.title : roleId;
    return MissionEngine.generatePrioritizedMissions(userId, roleTitle, skillGaps, availableHours);
  }

  // =========================================================================
  // 6. REASSESSMENT & LEARNING VELOCITY
  // =========================================================================

  public getReassessment(
    skillId: string,
    roleId: string,
    previousDemonstratedLevel: number,
    currentDemonstratedLevel: number,
    historyPoints: ScoreHistoryPoint[] = []
  ): ReassessmentResult {
    const skill = this.skillGraph.getSkillById(skillId);
    const skillName = skill ? skill.name : skillId;
    const role = this.getJobRoleById(roleId);
    const req = role?.requirements.find((r) => r.skillId === skillId);
    const requiredLevel = req ? req.minimumLevel : 3;

    return ReassessmentEngine.compareReassessment(
      skillId,
      skillName,
      roleId,
      requiredLevel,
      previousDemonstratedLevel,
      currentDemonstratedLevel,
      historyPoints
    );
  }

  public getLearningVelocity(
    skillId: string,
    historyPoints: ScoreHistoryPoint[]
  ): LearningVelocityResult {
    return ReassessmentEngine.calculateLearningVelocity(skillId, historyPoints);
  }
}

export const defaultPlacementService = new PlacementService();
