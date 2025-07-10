import React, { useState } from 'react';
import { DailyPlan } from '../types';

interface PlanFormProps {
  plan: DailyPlan;
  onAddTimeSlot: (time: string, activity: string) => void;
  onSave: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ plan, onAddTimeSlot, onSave }) => {
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (time && activity.trim()) {
      onAddTimeSlot(time, activity.trim());
      setTime('');
      setActivity('');
    }
  };

  const suggestedTimes = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ];

  const suggestedActivities = [
    '기상', '아침 식사', '출근', '업무/공부', '점심 식사',
    '회의', '운동', '독서', '저녁 식사', '휴식', '취침 준비'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          📝 계획 편집
        </h2>
        <p className="text-gray-600">
          오늘의 시간별 계획을 추가하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              시간
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">시간 선택</option>
              {suggestedTimes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
              활동 내용
            </label>
            <input
              type="text"
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="할 일을 입력하세요..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-600">빠른 입력:</span>
          {suggestedActivities.map(suggested => (
            <button
              key={suggested}
              type="button"
              onClick={() => setActivity(suggested)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {suggested}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
        >
          ➕ 계획 추가
        </button>
      </form>

      {plan.timeSlots.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            📋 현재 계획 ({plan.timeSlots.length}개)
          </h3>
          <div className="space-y-2">
            {plan.timeSlots.map(slot => (
              <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm text-gray-600 bg-white px-2 py-1 rounded">
                    {slot.time}
                  </span>
                  <span className="text-gray-900">{slot.activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onSave}
          className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          ✅ 편집 완료
        </button>
      </div>
    </div>
  );
};

export default PlanForm;