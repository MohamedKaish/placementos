export type Department = 
  | 'CSE'
  | 'EEE'
  | 'ECE'
  | 'Mechanical'
  | 'Civil'
  | 'Chemical'
  | 'Biotechnology';

export type AcademicYear = 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4';

export type ReadinessBand = 'READY' | 'DEVELOPING' | 'EARLY_STAGE' | 'NOT_ASSESSED';

export type CalibrationStatus = 'OVERCONFIDENT' | 'CALIBRATED' | 'UNDERCONFIDENT';

export type EvidenceTrustLevel = 
  | 'CLAIMED'
  | 'UNVERIFIED_SELF'
  | 'AUTOMATED_TEST'
  | 'DIAGNOSTIC_ASSESSMENT'
  | 'EMPIRICAL_TELEMETRY';

export interface RoleProfile {
  id: string;
  title: string;
  industry: string;
  departmentAgnostic: boolean;
  recommendedDepartments: Department[];
  targetSkill: string;
  benchmarkThresholds: {
    technical: number;
    aptitude: number;
    communication: number;
    overall: number;
  };
  requiredSkills: Array<{
    skillId: string;
    skillName: string;
    requiredScore: number;
    subskills: string[];
  }>;
}

export interface AssessmentQuestion {
  id: string;
  skillId: string;
  skillName: string;
  subskill: string;
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  questionText: string;
  contextCodeOrFormula?: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
  explanation: string;
  sequenceFactor?: string;
}

export interface AssessmentSubmission {
  questionId: string;
  selectedOptionId: string;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  timeSpentSeconds: number;
}

export interface WeakSubskill {
  name: string;
  claimedScore: number;
  demonstratedScore: number;
  requiredScore: number;
  gap: number;
  rootCause: string;
  errorTrace: string;
}

export interface EvidenceTelemetryItem {
  type: string;
  label: string;
  confidenceWeight: number;
  sampleCount: number;
  status: 'VERIFIED' | 'TELEMETRY_LOGGED' | 'IN_PROGRESS';
}

export interface CalibrationResult {
  runId: string;
  studentId: string;
  roleId: string;
  roleTitle: string;
  department: Department;
  academicYear: AcademicYear;
  targetSkill: string;
  claimedScore: number;      // e.g. 8.0
  demonstratedScore: number; // e.g. 4.5
  requiredScore: number;     // e.g. 7.0
  calibrationGap: number;    // +3.5
  calibrationStatus: CalibrationStatus;
  selfEfficacyIndex: string; // "Very High (92nd %ile)"
  confidenceInterval: string;// "98.4%"
  evidenceUsed: EvidenceTelemetryItem[];
  weakSubskills: WeakSubskill[];
  explanation: string;
  meaning: string;
  nextActionRecommendation: string;
  timestamp: string;
}

export interface MissionStage {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
}

export interface Mission {
  id: string;
  targetSkill: string;
  title: string;
  priority: 'INTERVENTION' | 'STANDARD' | 'MAINTENANCE';
  targetRoleRationale: string;
  objective: string;
  practiceTask: string;
  estimatedDuration: string;
  stages: MissionStage[];
  successCriteria: string[];
  deltaTarget: string; // "+2.5 Index"
  benchmarkTarget: number;
  verifiedBaseline: number;
  simulationSandbox: {
    systemState: string;
    faultType: string;
    impedanceSpec: string;
    taskPrompt: string;
    starterFormulaOrCode: string;
    verificationRule: string;
  };
}

export interface ReadinessDimension {
  name: 'Technical' | 'Aptitude' | 'Communication' | 'Interview Readiness' | 'Evidence Strength';
  score: number | null; // null if NOT_ASSESSED
  status: ReadinessBand;
  benchmarkScore: number;
  evidenceCount: number;
  notes: string;
}

export interface ReadinessReport {
  studentProfile: {
    name: string;
    targetRole: string;
    department: Department;
    academicYear: AcademicYear;
    telemetryRunId: string;
  };
  overallBand: ReadinessBand;
  overallScore: number | null;
  integrityScore: number; // e.g. 88
  dimensions: ReadinessDimension[];
  skillsBreakdown: Array<{
    name: string;
    claimed: number;
    demonstrated: number;
    required: number;
    gap: number;
    status: 'SURPASSED' | 'CALIBRATED' | 'DEFICIT' | 'NOT_ASSESSED';
  }>;
  dataSufficiency: 'SUFFICIENT' | 'NOT_ENOUGH_DATA';
}

export interface ReassessmentResult {
  skill: string;
  beforeScore: number;
  afterScore: number;
  delta: number;
  learningVelocity: number | null; // null if insufficient data
  status: 'IMPROVED' | 'STAGNANT' | 'NOT_ENOUGH_DATA';
  dataSufficiency: 'SUFFICIENT' | 'NOT_ENOUGH_DATA';
  verifiedAt: string;
  verificationTelemetryRun: string;
  notes: string;
}
