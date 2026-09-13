/**
 * 운동 템플릿 목록
 * 새 운동을 추가할 때는 이 파일만 수정하면 대부분 반영됩니다.
 *
 * inputType:
 *   - time      : 시간(분) + 선택적 거리 (걷기, 런닝 등)
 *   - timeSets  : 시간 + 세트 (데드행, 플랭크 등)
 *   - repsSets  : 횟수 + 세트 (팔굽혀펴기, 크런치 등)
 */

export const DIFFICULTY_OPTIONS = [
  { id: 'veryEasy', label: '매우 쉬움' },
  { id: 'easy', label: '쉬움' },
  { id: 'moderate', label: '적당함' },
  { id: 'hard', label: '힘듦' },
  { id: 'veryHard', label: '매우 힘듦' },
];

export const exerciseTemplates = [
  {
    id: 'walking',
    name: '걷기',
    inputType: 'time',
    timeUnit: '분',
    // 기본값 없음 — 직접 입력
    defaults: {},
  },
  {
    id: 'deadHang',
    name: '데드행',
    inputType: 'timeSets',
    timeUnit: '초',
    defaults: { seconds: 5, sets: 3 },
  },
  {
    id: 'inclinePushup',
    name: '인클라인 팔굽혀펴기',
    inputType: 'repsSets',
    defaults: { reps: 3, sets: 1 },
  },
  {
    id: 'crunch',
    name: '크런치',
    inputType: 'repsSets',
    defaults: { reps: 10, sets: 2 },
  },
  {
    id: 'legRaise',
    name: '레그레이즈',
    inputType: 'repsSets',
    defaults: { reps: 8, sets: 2 },
  },
];

export function getTemplateById(typeId) {
  return exerciseTemplates.find((t) => t.id === typeId) ?? null;
}

/** 기록 한 건을 사람이 읽기 쉬운 한 줄로 변환 */
export function formatExerciseSummary(exercise) {
  const template = getTemplateById(exercise.type);
  if (!template) return '';

  if (template.inputType === 'time') {
    let text = `${exercise.minutes}분`;
    if (exercise.distance != null && exercise.distance !== '') {
      text += ` / ${exercise.distance}km`;
    }
    return text;
  }

  if (template.inputType === 'timeSets') {
    return `${exercise.seconds}${template.timeUnit} × ${exercise.sets}세트`;
  }

  if (template.inputType === 'repsSets') {
    return `${exercise.reps}회 × ${exercise.sets}세트`;
  }

  return '';
}

/** 같은 종류의 여러 기록을 합산 */
export function aggregateByType(exercises) {
  const map = {};

  for (const exercise of exercises) {
    const template = getTemplateById(exercise.type);
    if (!template) continue;

    if (!map[exercise.type]) {
      map[exercise.type] = {
        type: exercise.type,
        name: exercise.name,
        inputType: template.inputType,
        count: 0,
        minutes: 0,
        seconds: 0,
        reps: 0,
        sets: 0,
        distance: 0,
      };
    }

    const agg = map[exercise.type];
    agg.count += 1;

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

  return Object.values(map);
}

/** 합산 결과를 짧은 문구로 */
export function formatAggregate(agg) {
  if (agg.inputType === 'time') {
    let text = `${agg.minutes}분`;
    if (agg.distance > 0) {
      text += ` / ${agg.distance.toFixed(1)}km`;
    }
    return text;
  }
  if (agg.inputType === 'timeSets') {
    return `총 ${agg.seconds}초 / ${agg.sets}세트`;
  }
  if (agg.inputType === 'repsSets') {
    return `총 ${agg.reps}회 / ${agg.sets}세트`;
  }
  return '';
}
