export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const getStorageKey = (date: string): string => {
  return `daily-planner-${date}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('ko-KR', options);
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${period} ${displayHour}:${minutes}`;
};

export const getCompletionStats = (timeSlots: any[]) => {
  const total = timeSlots.length;
  const completed = timeSlots.filter(slot => slot.completed).length;
  const pending = timeSlots.filter(slot => !slot.completed).length;
  
  return {
    total,
    completed,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};