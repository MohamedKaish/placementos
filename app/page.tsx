'use client';

import React, { useState } from 'react';
import { Header, ScreenId } from '@/components/Header';
import { LandingScreen } from '@/components/LandingScreen';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { AssessmentScreen } from '@/components/AssessmentScreen';
import { CalibrationResultScreen } from '@/components/CalibrationResultScreen';
import { MissionScreen } from '@/components/MissionScreen';
import { ReadinessDashboardScreen } from '@/components/ReadinessDashboardScreen';
import { ReassessmentScreen } from '@/components/ReassessmentScreen';
import { defaultPlacementService } from '@/lib/placement-service';
import {
  CalibrationUIResult,
  MissionUI,
  ReadinessReportUI,
  ReassessmentResultUI,
} from '@/types/team2-contract';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');

  // Live state from PlacementService
  const [calibrationResult, setCalibrationResult] = useState<CalibrationUIResult>(() =>
    defaultPlacementService.getCalibrationResult()
  );
  const [mission, setMission] = useState<MissionUI>(() =>
    defaultPlacementService.generateTargetedMission()
  );
  const [readinessReport, setReadinessReport] = useState<ReadinessReportUI>(() =>
    defaultPlacementService.getReadinessReport()
  );
  const [reassessment, setReassessment] = useState<ReassessmentResultUI>(() =>
    defaultPlacementService.runReassessment(false)
  );

  const departments = defaultPlacementService.getDepartments();
  const jobRoles = defaultPlacementService.getJobRoles();

  // Navigation & Flow Handlers
  const handleStartDemo = () => {
    setCurrentScreen('onboarding');
  };

  const handleCustomIntake = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (data: {
    departmentCode: string;
    academicYear: string;
    roleId: string;
    claimedScore: number;
    candidateName: string;
  }) => {
    defaultPlacementService.setCandidateConfig({
      departmentCode: data.departmentCode,
      academicYear: data.academicYear,
      roleId: data.roleId,
      claimedScore: data.claimedScore,
      name: data.candidateName,
    });
    setCalibrationResult(defaultPlacementService.getCalibrationResult());
    setReadinessReport(defaultPlacementService.getReadinessReport());
    setCurrentScreen('assessment');
  };

  const handleAssessmentComplete = () => {
    const updatedCalibration = defaultPlacementService.getCalibrationResult();
    const updatedMission = defaultPlacementService.generateTargetedMission();
    const updatedReadiness = defaultPlacementService.getReadinessReport();

    setCalibrationResult(updatedCalibration);
    setMission(updatedMission);
    setReadinessReport(updatedReadiness);
    setCurrentScreen('calibration');
  };

  const handleStartMission = () => {
    setCurrentScreen('mission');
  };

  const handleMissionComplete = () => {
    defaultPlacementService.completeActiveMission();
    setReassessment(defaultPlacementService.runReassessment(true));
    setCurrentScreen('reassessment');
  };

  const handleRestartDemo = () => {
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-mono selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Application Header Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        targetRole={calibrationResult.roleTitle}
        department={calibrationResult.department}
        candidateName={calibrationResult.candidateName}
        readinessStatus={readinessReport.overallBand}
      />

      {/* Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStartDemo={handleStartDemo}
            onCustomIntake={handleCustomIntake}
            onViewDashboard={() => setCurrentScreen('dashboard')}
            departments={departments}
            jobRoles={jobRoles}
          />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen
            departments={departments}
            jobRoles={jobRoles}
            onComplete={handleOnboardingComplete}
          />
        )}

        {currentScreen === 'assessment' && (
          <AssessmentScreen onComplete={handleAssessmentComplete} />
        )}

        {currentScreen === 'calibration' && (
          <CalibrationResultScreen
            result={calibrationResult}
            onStartMission={handleStartMission}
            onViewDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'mission' && (
          <MissionScreen
            mission={mission}
            onCompleteMission={handleMissionComplete}
            onViewDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <ReadinessDashboardScreen
            report={readinessReport}
            onNavigateToMission={() => setCurrentScreen('mission')}
            onNavigateToReassessment={() => setCurrentScreen('reassessment')}
            onNavigateToCalibration={() => setCurrentScreen('calibration')}
          />
        )}

        {currentScreen === 'reassessment' && (
          <ReassessmentScreen
            reassessment={reassessment}
            onRestartDemo={handleRestartDemo}
            onViewDashboard={() => setCurrentScreen('dashboard')}
          />
        )}
      </main>

      {/* Persistent Institutional Telemetry Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant py-4 select-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-label-sm text-outline">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary"></span>
            <span>&copy; 2026 PlacementOS &bull; Evidence-Weighted Career Readiness Intelligence</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-on-surface">Team 1 Intelligence Layer &bull; Stitch Precision Telemetry UI</span>
            <span className="text-primary font-bold">Hackathon Demo Flow: EEE &bull; Power Systems Engineer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
