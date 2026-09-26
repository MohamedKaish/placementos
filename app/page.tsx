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
import { CalibrationResult, Mission, ReadinessReport, Department, AcademicYear } from '@/types/team2-contract';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [calibrationResult, setCalibrationResult] = useState<CalibrationResult>(() =>
    defaultPlacementService.finalizeAssessment()
  );
  const [mission, setMission] = useState<Mission>(() =>
    defaultPlacementService.generateTargetedMission()
  );
  const [readinessReport, setReadinessReport] = useState<ReadinessReport>(() =>
    defaultPlacementService.getReadinessReport()
  );

  // Onboarding data passed to assessment
  const [onboardingData, setOnboardingData] = useState<{
    department: Department;
    academicYear: AcademicYear;
    roleId: string;
    claimedScore: number;
  }>({
    department: 'EEE',
    academicYear: 'Year 4',
    roleId: 'power-systems-engineer',
    claimedScore: 8.0,
  });

  // Candidate identity
  const [candidateName, setCandidateName] = useState<string>('');

  // Navigation Handlers
  const handleStartIntake = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (data: {
    department: any;
    academicYear: any;
    roleId: string;
    claimedScore: number;
    studentName: string;
  }) => {
    setCandidateName(data.studentName);
    setOnboardingData({
      department: data.department,
      academicYear: data.academicYear,
      roleId: data.roleId,
      claimedScore: data.claimedScore,
    });
    setCurrentScreen('assessment');
  };

  const handleAssessmentComplete = (result: CalibrationResult) => {
    setCalibrationResult(result);
    // Generate targeted mission based on calibration
    const generatedMission = defaultPlacementService.generateTargetedMission();
    setMission(generatedMission);
    // Update readiness report
    setReadinessReport(defaultPlacementService.getReadinessReport());
    setCurrentScreen('calibration');
  };

  const handleStartMission = () => {
    setCurrentScreen('mission');
  };

  const handleMissionComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleRestart = () => {
    setCandidateName('');
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Header Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        targetRole={calibrationResult?.roleTitle ?? 'Power Systems Engineer'}
        department={onboardingData.department}
        readinessStatus={readinessReport?.overallBand === 'DEVELOPING' ? 'Developing' : 'Ready'}
        candidateName={candidateName}
      />

      {/* Screen Routing */}
      <main className="flex-1 w-full">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStartDemo={handleStartIntake}
            onCustomIntake={() => setCurrentScreen('onboarding')}
          />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}

        {currentScreen === 'assessment' && (
          <AssessmentScreen
            onComplete={handleAssessmentComplete}
            department={onboardingData.department}
            roleId={onboardingData.roleId}
            academicYear={onboardingData.academicYear}
            claimedScore={onboardingData.claimedScore}
            candidateName={candidateName}
          />
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
            onRestartDemo={handleRestart}
            onViewDashboard={() => setCurrentScreen('dashboard')}
          />
        )}
      </main>

      {/* Persistent Enterprise Footer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant/20 py-6 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[12px] text-on-surface-variant">
          <div>
            &copy; 2026 PlacementOS Enterprise. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-on-surface font-semibold">Team 1 Core Intelligence Layer &bull; Team 2 Stitch UI Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
