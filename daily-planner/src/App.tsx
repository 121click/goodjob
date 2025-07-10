import React, { useState, useEffect } from 'react';
import { DailyPlan, TimeSlot, EvaluationType } from './types';
import Header from './components/Header';
import PlanForm from './components/PlanForm';
import PlanView from './components/PlanView';
import { generateId, getCurrentDate, getStorageKey } from './utils/helpers';

function App() {
  const [currentPlan, setCurrentPlan] = useState<DailyPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 로컬스토리지에서 오늘 계획 로드
  useEffect(() => {
    const today = getCurrentDate();
    const storageKey = getStorageKey(today);
    const savedPlan = localStorage.getItem(storageKey);
    
    if (savedPlan) {
      setCurrentPlan(JSON.parse(savedPlan));
    } else {
      // 새로운 계획 생성
      const newPlan: DailyPlan = {
        id: generateId(),
        date: today,
        timeSlots: [],
        overallEvaluation: '',
        motivationalMessage: '오늘도 열심히 살았다! 칭찬해!'
      };
      setCurrentPlan(newPlan);
    }
  }, []);

  // 계획 저장
  const savePlan = (plan: DailyPlan) => {
    const storageKey = getStorageKey(plan.date);
    localStorage.setItem(storageKey, JSON.stringify(plan));
    setCurrentPlan(plan);
  };

  // 시간 슬롯 추가
  const addTimeSlot = (time: string, activity: string) => {
    if (!currentPlan) return;

    const newTimeSlot: TimeSlot = {
      id: generateId(),
      time,
      activity,
      completed: false,
      evaluation: null
    };

    const updatedPlan = {
      ...currentPlan,
      timeSlots: [...currentPlan.timeSlots, newTimeSlot].sort((a, b) => a.time.localeCompare(b.time))
    };

    savePlan(updatedPlan);
  };

  // 완료 상태 토글
  const toggleCompletion = (slotId: string) => {
    if (!currentPlan) return;

    const updatedTimeSlots = currentPlan.timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, completed: !slot.completed } : slot
    );

    const updatedPlan = { ...currentPlan, timeSlots: updatedTimeSlots };
    savePlan(updatedPlan);
  };

  // 평가 업데이트
  const updateEvaluation = (slotId: string, evaluation: EvaluationType) => {
    if (!currentPlan) return;

    const updatedTimeSlots = currentPlan.timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, evaluation } : slot
    );

    const updatedPlan = { ...currentPlan, timeSlots: updatedTimeSlots };
    savePlan(updatedPlan);
  };

  // 시간 슬롯 삭제
  const deleteTimeSlot = (slotId: string) => {
    if (!currentPlan) return;

    const updatedTimeSlots = currentPlan.timeSlots.filter(slot => slot.id !== slotId);
    const updatedPlan = { ...currentPlan, timeSlots: updatedTimeSlots };
    savePlan(updatedPlan);
  };

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">계획을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        date={currentPlan.date}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {isEditing ? (
          <PlanForm
            plan={currentPlan}
            onAddTimeSlot={addTimeSlot}
            onSave={() => setIsEditing(false)}
          />
        ) : (
          <PlanView
            plan={currentPlan}
            onToggleCompletion={toggleCompletion}
            onUpdateEvaluation={updateEvaluation}
            onDeleteTimeSlot={deleteTimeSlot}
          />
        )}
      </main>
    </div>
  );
}

export default App;
