export interface TimeSlot {
  id: string;
  time: string;
  activity: string;
  completed: boolean;
  evaluation: 'excellent' | 'good' | 'poor' | null;
  notes?: string;
}

export interface DailyPlan {
  id: string;
  date: string;
  timeSlots: TimeSlot[];
  overallEvaluation: string;
  motivationalMessage: string;
}

export interface PlannerState {
  currentPlan: DailyPlan | null;
  plans: DailyPlan[];
}

export type EvaluationType = 'excellent' | 'good' | 'poor';

export const EVALUATION_LABELS = {
  excellent: '이겨 되네!',
  good: '괜찮아요',
  poor: '이전안되네!'
} as const;