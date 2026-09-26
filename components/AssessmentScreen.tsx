'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AssessmentQuestion, CalibrationResult, Department, AcademicYear } from '@/types/team2-contract';
import { defaultPlacementService } from '@/lib/placement-service';

interface AssessmentScreenProps {
  onComplete: (result: CalibrationResult) => void;
  department?: Department;
  roleId?: string;
  academicYear?: AcademicYear;
  claimedScore?: number;
  candidateName?: string;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  onComplete,
  department = 'EEE',
  roleId = 'power-systems-engineer',
  academicYear = 'Year 4',
  claimedScore = 8.0,
  candidateName = '',
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [confidence, setConfidence] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('HIGH');
  const [submissionsCount, setSubmissionsCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const session = defaultPlacementService.startAssessment({
      roleId,
      department,
      academicYear,
      claimedScore,
      candidateName,
    });
    setQuestions(session.questions);
    setStartTime(Date.now());
  }, [department, roleId, academicYear, claimedScore, candidateName]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleNextOrSubmit = () => {
    if (!currentQ || !selectedOption) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    // Submit answer to Team 1 service layer
    defaultPlacementService.submitAnswer({
      questionId: currentQ.id,
      selectedOptionId: selectedOption,
      confidence,
      timeSpentSeconds: timeSpent,
    });

    setSubmissionsCount((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption('');
      // For questions, default confidence to HIGH to simulate the overconfidence pattern requested in demo
      setConfidence('HIGH');
      setStartTime(Date.now());
    } else {
      // Finalize through Team 1 engine
      const finalResult = defaultPlacementService.finalizeAssessment();
      onComplete(finalResult);
    }
  };

  const handleFastForward = () => {
    // Answer remaining questions and finalize immediately
    questions.forEach((q, idx) => {
      // Intentionally simulate the student's pattern: confident but miscalculating sequence grounding
      const chosen = idx === 0 ? q.correctOptionId : (q.options[1]?.id || q.options[0].id);
      defaultPlacementService.submitAnswer({
        questionId: q.id,
        selectedOptionId: chosen,
        confidence: 'HIGH',
        timeSpentSeconds: 15,
      });
    });
    const finalResult = defaultPlacementService.finalizeAssessment();
    onComplete(finalResult);
  };

  if (!currentQ) {
    return (
      <div className="w-full min-h-screen pt-24 flex items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-[14px]">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          <span>Loading telemetry probe questions...</span>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="w-full min-h-screen pt-20 pb-16 bg-surface">
      {/* Top Context Bar */}
      <div className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span>Assessments</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Diagnostic Run #104</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Live Empirical Telemetry Probe</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-surface-container-highest rounded text-on-surface font-semibold text-[11px]">
              MODE: FORENSIC TRIANGULATION
            </span>
            <button
              onClick={handleFastForward}
              className="text-primary hover:underline text-[11px] font-medium"
              title="Fast-forward assessment to generate flagship calibration results"
            >
              [Quick Complete]
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        {/* Progress & Header */}
        <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] rounded font-semibold uppercase">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="font-mono text-[12px] text-on-surface-variant">
                Target Skill: <strong className="text-on-surface">{currentQ.skillName}</strong>
              </span>
              <span className="px-2 py-0.5 bg-surface-container-high text-on-surface font-mono text-[11px] rounded">
                Subskill: {currentQ.subskill}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] text-on-surface-variant">
                Progress: <strong className="text-primary">{progressPercent}%</strong>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Question Canvas */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                Empirical Evaluation Prompt
              </span>
            </div>
            <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold leading-relaxed">
              {currentQ.questionText}
            </h2>

            {currentQ.contextCodeOrFormula && (
              <div className="p-3.5 bg-inverse-surface text-inverse-on-surface rounded font-mono text-[13px] border border-outline-variant/30 overflow-x-auto">
                <span className="text-tertiary-fixed font-bold">{'// Telemetry Context Boundary:'}</span>
                <pre className="mt-1 whitespace-pre-wrap">{currentQ.contextCodeOrFormula}</pre>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
              Select Verified Engineering Derivation:
            </span>

            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline bg-surface-container-lowest'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                  <span className="font-body-md text-[14px] text-on-surface leading-normal">
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Confidence Telemetry Bar (Critical for Overconfidence Calibration) */}
          <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-bold block">
                Self-Reported Confidence Rating
              </span>
              <span className="text-[12px] text-on-surface-variant">
                Used to triangulate epistemic calibration vs overconfidence bias.
              </span>
            </div>

            <div className="flex items-center gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as const).map((lvl) => {
                const isSelected = confidence === lvl;
                return (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setConfidence(lvl)}
                    className={`px-3 py-1.5 rounded font-mono text-[12px] border transition-colors ${
                      isSelected
                        ? lvl === 'HIGH'
                          ? 'bg-secondary text-white border-secondary font-bold'
                          : 'bg-primary text-white border-primary font-bold'
                        : 'bg-surface-container-lowest text-on-surface border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
            <span className="font-mono text-[11px] text-on-surface-variant">
              Telemetry Sample: #{currentQ.id}
            </span>

            <button
              onClick={handleNextOrSubmit}
              disabled={!selectedOption}
              className={`px-6 py-2.5 font-mono text-[13px] font-semibold rounded shadow-sm flex items-center gap-2 transition-colors ${
                selectedOption
                  ? 'bg-primary hover:bg-primary-container text-white cursor-pointer'
                  : 'bg-surface-container text-on-surface-variant opacity-60 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === questions.length - 1 ? 'Finalize Telemetry' : 'Submit & Next'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {currentIndex === questions.length - 1 ? 'task_alt' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
