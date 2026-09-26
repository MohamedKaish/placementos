'use client';

import React, { useState, useEffect } from 'react';
import { defaultPlacementService } from '@/lib/placement-service';
import { AssessmentQuestion, StudentQuestionConfidence } from '@/types/assessment';
import { Timer, ArrowRight } from 'lucide-react';

interface AssessmentScreenProps {
  onComplete: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState<AssessmentQuestion | null>(() => {
    const session = defaultPlacementService.startDiagnosticSession();
    return session.firstQuestion || null;
  });
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const totalQuestions = 4;
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [confidence, setConfidence] = useState<StudentQuestionConfidence>('high');
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleNextQuestion = () => {
    if (!selectedOptionId || !currentQuestion) return;

    setIsSubmitting(true);

    try {
      const response = defaultPlacementService.submitDiagnosticAnswer(
        currentQuestion.id,
        selectedOptionId,
        confidence,
        secondsElapsed
      );


      if (response.isFinished || !response.nextQuestion || questionIndex >= totalQuestions) {
        // Finalize
        defaultPlacementService.finalizeDiagnosticAssessment();
        onComplete();
      } else {
        setCurrentQuestion(response.nextQuestion);
        setQuestionIndex((prev) => prev + 1);
        setSelectedOptionId('');
        setIsSubmitting(false);
      }
    } catch {
      // In case of any edge case finalize smoothly
      defaultPlacementService.finalizeDiagnosticAssessment();
      onComplete();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-primary animate-ping"></span>
          <span>INITIALIZING ADAPTIVE DIAGNOSTIC PROBE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-grid-matrix min-h-screen pb-12">
      {/* Top Telemetry Masthead */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant p-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="border-l-2 border-primary pl-3">
            <div className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Active Evaluation Module</div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Power Systems / Symmetrical &amp; Unsymmetrical Fault Analysis
            </div>
          </div>

          <div className="flex items-center gap-6 bg-surface-container-lowest px-4 py-2 border border-outline-variant font-body-sm text-body-sm self-start lg:self-auto">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-outline uppercase text-label-sm">Response Latency:</span>
              <span className="font-bold text-on-surface font-mono">{secondsElapsed}s</span>
            </div>
            <div className="w-[1px] h-4 bg-outline-variant"></div>
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 bg-secondary"></span>
              <span className="text-secondary font-label-sm uppercase font-semibold">Level {currentQuestion.difficulty} Probe</span>
            </div>
          </div>
        </div>

        {/* Stepper Bar */}
        <div className="max-w-[1440px] mx-auto mt-4 pt-3 border-t border-outline-variant grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((idx) => {
            const isDone = idx < questionIndex;
            const isCurrent = idx === questionIndex;
            return (
              <div
                key={idx}
                className={`h-2 border transition-all ${
                  isDone
                    ? 'bg-secondary border-secondary'
                    : isCurrent
                    ? 'bg-primary border-primary animate-pulse'
                    : 'bg-surface-variant border-outline-variant'
                }`}
                title={`Item ${idx}`}
              />
            );
          })}
        </div>
      </section>

      {/* Main Assessment Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Question Formulation Card (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface-container-low border border-outline-variant p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <span className="px-2 py-0.5 bg-surface-container-highest border border-outline font-label-sm text-label-sm text-on-surface uppercase">
                  Problem Statement ID: {currentQuestion.id.toUpperCase()}
                </span>
                <span className="text-outline text-label-sm font-mono">[SUB-TRANSIENT DOMAIN]</span>
              </div>

              {/* Question Text */}
              <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Technical Schematic / Sequence Formula Box */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 font-mono text-xs text-on-surface-variant space-y-2">
                <div className="text-primary font-bold">[SEQUENCE NETWORK BOUNDARY SPECIFICATION]</div>
                <div className="text-slate-300">
                  Ia0 = Ia1 = Ia2 = (1/3) &middot; Ia <br />
                  Va = Va1 + Va2 + Va0 = 0 &rArr; SLG Fault on Phase A to Earth Bus
                </div>
                <div className="text-[11px] text-outline">
                  Reference Neutral Impedance: Zn &ne; 0 | Transformed Zero-Sequence Loop: Z0 + 3Zn
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3 pt-2">
                <div className="font-label-sm text-outline uppercase tracking-wider">Select Mathematical Derivation:</div>
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`p-4 border flex items-start space-x-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-2 border-primary bg-surface-container-high'
                          : 'border-outline-variant bg-surface-container hover:border-outline'
                      }`}
                    >
                      <span className={`w-5 h-5 flex items-center justify-center border font-mono text-xs font-bold ${
                        isSelected ? 'border-primary bg-primary text-on-primary' : 'border-outline text-outline'
                      }`}>
                        {option.id.replace('opt_', '').toUpperCase()}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {option.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Confidence Level Selector */}
              <div className="pt-4 border-t border-outline-variant">
                <div className="font-label-sm text-outline uppercase tracking-wider mb-2">Declare Self-Efficacy Confidence:</div>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as StudentQuestionConfidence[]).map((lvl) => {
                    const isSelected = confidence === lvl;
                    return (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setConfidence(lvl)}
                        className={`py-2 px-3 border font-label-sm uppercase font-bold transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-outline-variant bg-surface-container text-outline hover:text-on-surface'
                        }`}
                      >
                        [{lvl.toUpperCase()} CONFIDENCE]
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 flex justify-between items-center">
                <div className="text-label-sm text-outline font-mono">
                  QUESTION {questionIndex} OF {totalQuestions}
                </div>
                <button
                  type="button"
                  disabled={!selectedOptionId || isSubmitting}
                  onClick={handleNextQuestion}
                  className={`px-6 py-3 font-label-md uppercase font-bold tracking-wider transition-all flex items-center space-x-2 border ${
                    !selectedOptionId || isSubmitting
                      ? 'bg-surface-variant text-outline border-outline-variant cursor-not-allowed'
                      : 'bg-primary-container text-on-primary-container hover:bg-primary border-primary-container'
                  }`}
                >
                  <span>{questionIndex >= totalQuestions ? 'FINALIZE TELEMETRY & AUDIT' : 'RECORD TELEMETRY & PROCEED'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Cognitive Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-outline-variant p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <span className="font-label-sm text-primary uppercase font-bold tracking-widest">[PROCTOR_TELEMETRY]</span>
                <span className="text-label-sm text-secondary font-mono">NODE_ONLINE</span>
              </div>

              <div className="space-y-3 font-body-sm text-on-surface-variant">
                <div>
                  <span className="text-outline text-label-sm uppercase">Engine Logic:</span>
                  <div className="text-on-surface font-semibold font-mono">Deterministic Adaptive Engine</div>
                </div>
                <div>
                  <span className="text-outline text-label-sm uppercase">Misconception Detection:</span>
                  <div className="text-on-surface font-semibold font-mono">Active Sequence Grounding Probe</div>
                </div>
                <div>
                  <span className="text-outline text-label-sm uppercase">Hiring Benchmark:</span>
                  <div className="text-primary font-semibold font-mono">Power Systems Engineer (Tier-1 Grid)</div>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest border border-outline-variant text-[11px] font-mono text-outline space-y-1">
                <div>LOG: Diagnostic Session 0x9AF2</div>
                <div>PROBE: Fault Analysis (SLG / LLG / 3P)</div>
                <div>CALIBRATION: Comparing self-efficacy claim against recorded empirical error trace.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
