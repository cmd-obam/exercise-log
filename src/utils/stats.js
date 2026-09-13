import { eachDayOfInterval, parseISO, subDays } from 'date-fns';
import {
  exerciseTemplates,
  getTemplateById,
  aggregateByType,
} from '../data/exerciseTemplates';
import { toDateKey, startOfMonth, endOfMonth } from './dateHelpers';

/** 해당 날짜에 운동 기록이 있는지 */
export function hasExercises(dayData) {
  return Boolean(dayData?.exercises?.length);
}

/**
 * 연속 운동 일수
 * - 오늘 또는 어제부터 거슬러 올라가며 계산
 * - 하루라도 기록이 있으면 운동한 날로 취급
 */
export function calculateStreak(records, today = new Date()) {
  let streak = 0;
  let cursor = today;
  const todayKey = toDateKey(today);

  // 오늘 기록이 없으면 어제부터 시작 (오늘을 아직 안 한 경우)
  if (!hasExercises(records[todayKey])) {
    cursor = subDays(today, 1);
  }

  while (true) {
    const key = toDateKey(cursor);
    if (!hasExercises(records[key])) break;
    streak += 1;
    cursor = subDays(cursor, 1);
  }

  return streak;
}

/** 이번 달 통계 */
export function calculateMonthlyStats(records, viewDate) {
  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start, end });

  let workoutDays = 0;
  const allExercises = [];

  for (const day of days) {
    const key = toDateKey(day);
    const dayData = records[key];
    if (hasExercises(dayData)) {
      workoutDays += 1;
      allExercises.push(...dayData.exercises);
    }
  }

  const byType = {};
  for (const template of exerciseTemplates) {
    byType[template.id] = {
      type: template.id,
      name: template.name,
      inputType: template.inputType,
      minutes: 0,
      seconds: 0,
      reps: 0,
      sets: 0,
      distance: 0,
    };
  }

  for (const exercise of allExercises) {
    const template = getTemplateById(exercise.type);
    if (!template || !byType[exercise.type]) continue;
    const agg = byType[exercise.type];

    if (template.inputType === 'time') {
      agg.minutes += Number(exercise.minutes) || 0;
      if (exercise.distance != null && exercise.distance !== '') {
        agg.distance += Number(exercise.distance) || 0;
      }
    } else if (template.inputType === 'timeSets') {
      agg.seconds += Number(exercise.seconds) || 0;
      agg.sets += Number(exercise.sets) || 0;
    } else if (template.inputType === 'repsSets') {
      agg.reps += Number(exercise.reps) || 0;
      agg.sets += Number(exercise.sets) || 0;
    }
  }

  return {
    workoutDays,
    byType: Object.values(byType).filter((agg) => {
      if (agg.inputType === 'time') return agg.minutes > 0;
      if (agg.inputType === 'timeSets') return agg.seconds > 0;
      if (agg.inputType === 'repsSets') return agg.reps > 0;
      return false;
    }),
    // 참고용: 일별 합산과 동일한 형태
    aggregates: aggregateByType(allExercises),
  };
}

export function formatMonthlyStatLine(agg) {
  if (agg.inputType === 'time') {
    let text = `총 ${agg.minutes}분`;
    if (agg.distance > 0) text += ` / ${agg.distance.toFixed(1)}km`;
    return text;
  }
  if (agg.inputType === 'timeSets') {
    return `총 ${agg.seconds}초`;
  }
  if (agg.inputType === 'repsSets') {
    return `총 ${agg.reps}회`;
  }
  return '';
}

/** 날짜 키 파싱이 필요한 경우용 (현재 unused지만 확장용) */
export function parseDateKey(key) {
  return parseISO(key);
}
