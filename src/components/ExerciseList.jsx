import './ExerciseList.css';
import ExerciseRecord from './ExerciseRecord';
import {
  aggregateByType,
  formatAggregate,
} from '../data/exerciseTemplates';

/**
 * 하루 운동 목록
 * 같은 운동이 여러 번이면 N차로 표시하고, 종류별 총합도 보여줍니다.
 */
function ExerciseList({
  exercises,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  if (!exercises.length) {
    return (
      <p className="exercise-list__empty">아직 기록된 운동이 없습니다.</p>
    );
  }

  // 같은 type의 등장 순서를 세어 "1차", "2차" 라벨 만들기
  const typeCounts = {};
  const typeTotals = {};
  for (const ex of exercises) {
    typeTotals[ex.type] = (typeTotals[ex.type] || 0) + 1;
  }

  const aggregates = aggregateByType(exercises);

  return (
    <div className="exercise-list">
      <div className="exercise-list__items">
        {exercises.map((exercise) => {
          typeCounts[exercise.type] = (typeCounts[exercise.type] || 0) + 1;
          const showIndex = typeTotals[exercise.type] > 1;
          const indexLabel = showIndex
            ? `${typeCounts[exercise.type]}차`
            : null;

          return (
            <ExerciseRecord
              key={exercise.id}
              exercise={exercise}
              indexLabel={indexLabel}
              onEdit={() => onEdit(exercise)}
              onDelete={() => onDelete(exercise)}
              onToggleComplete={() => onToggleComplete(exercise)}
            />
          );
        })}
      </div>

      {aggregates.some((a) => a.count > 1) && (
        <div className="exercise-list__totals">
          <h4>종류별 총합</h4>
          <ul>
            {aggregates
              .filter((a) => a.count > 1)
              .map((agg) => (
                <li key={agg.type}>
                  <strong>{agg.name}</strong>
                  <span>
                    {agg.inputType === 'repsSets' &&
                      `총 ${agg.reps}회 · 총 ${agg.sets}세트`}
                    {agg.inputType === 'timeSets' &&
                      `총 ${agg.seconds}초 · 총 ${agg.sets}세트`}
                    {agg.inputType === 'time' && formatAggregate(agg)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExerciseList;
