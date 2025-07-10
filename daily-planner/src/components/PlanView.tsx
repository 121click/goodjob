import React from 'react';
import { DailyPlan, EvaluationType, EVALUATION_LABELS } from '../types';
import { formatTime, getCompletionStats } from '../utils/helpers';

interface PlanViewProps {
  plan: DailyPlan;
  onToggleCompletion: (slotId: string) => void;
  onUpdateEvaluation: (slotId: string, evaluation: EvaluationType) => void;
  onDeleteTimeSlot: (slotId: string) => void;
}

const PlanView: React.FC<PlanViewProps> = ({
  plan,
  onToggleCompletion,
  onUpdateEvaluation,
  onDeleteTimeSlot
}) => {
  const stats = getCompletionStats(plan.timeSlots);

  const getEvaluationColor = (evaluation: EvaluationType) => {
    switch (evaluation) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSlotStatus = (completed: boolean, evaluation: EvaluationType | null) => {
    if (completed && evaluation) return 'completed';
    if (completed && !evaluation) return 'pending';
    return 'missed';
  };

  if (plan.timeSlots.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          아직 계획이 없어요
        </h3>
        <p className="text-gray-600 mb-6">
          편집 버튼을 눌러서 오늘의 계획을 세워보세요!
        </p>
        <div className="text-2xl">✨ 오늘도 화이팅! ✨</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📊 진행 현황
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
            <div className="text-sm text-gray-600">전체 계획</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">완료</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">대기</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">달성률</div>
          </div>
        </div>
        
        {/* 진행률 바 */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>진행률</span>
            <span>{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 시간별 계획 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          ⏰ 시간별 계획
        </h2>
        
        <div className="space-y-4">
          {plan.timeSlots.map(slot => (
            <div
              key={slot.id}
              className={`time-slot p-4 rounded-lg border-2 transition-all duration-200 ${
                slot.completed ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* 체크박스 */}
                  <button
                    onClick={() => onToggleCompletion(slot.id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      slot.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {slot.completed && '✓'}
                  </button>

                  {/* 시간과 활동 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {formatTime(slot.time)}
                      </span>
                      <span className={`text-lg ${slot.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {slot.activity}
                      </span>
                    </div>

                    {/* 평가 버튼들 */}
                    {slot.completed && (
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-sm text-gray-600">평가:</span>
                        {(['excellent', 'good', 'poor'] as EvaluationType[]).map(evaluation => (
                          <button
                            key={evaluation}
                            onClick={() => onUpdateEvaluation(slot.id, evaluation)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                              slot.evaluation === evaluation
                                ? getEvaluationColor(evaluation)
                                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            {EVALUATION_LABELS[evaluation]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => onDeleteTimeSlot(slot.id)}
                  className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 동기부여 메시지 */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200 p-6 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-xl font-semibold text-purple-900 mb-2">
          {plan.motivationalMessage}
        </h3>
        <p className="text-purple-700">
          매일 조금씩 발전하는 당신이 대단해요! 👏
        </p>
      </div>
    </div>
  );
};

export default PlanView;