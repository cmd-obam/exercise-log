import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';

/** Date → "2026-09-13" (저장용 키) */
export function toDateKey(date) {
  return format(date, 'yyyy-MM-dd');
}

/** "2026-09-13" → Date */
export function fromDateKey(key) {
  return parseISO(key);
}

/** 화면용: 2026년 9월 */
export function formatYearMonth(date) {
  return format(date, 'yyyy년 M월', { locale: ko });
}

/** 화면용: 2026년 9월 13일 */
export function formatFullDate(date) {
  return format(date, 'yyyy년 M월 d일', { locale: ko });
}

/** 월간 캘린더에 표시할 날짜 배열 (일요일 시작) */
export function getCalendarDays(viewDate) {
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: calStart, end: calEnd });
}

export {
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
};
