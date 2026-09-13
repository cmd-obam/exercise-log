import './ExerciseRecord.css';
import {
  formatExerciseSummary,
  DIFFICULTY_OPTIONS,
} from '../data/exerciseTemplates';

/**
 * 개별 운동 기록 한 줄
 */
function ExerciseRecord({
  exercise,
  indexLabel,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const difficultyLabel = DIFFICULTY_OPTIONS.find(
    (d) => d.id === exercise.difficulty,
  )?.label;

  return (
    <article
      className={`exercise-record ${exercise.completed ? 'is-completed' : ''}`}
    >
      <div className="exercise-record__main">
        <label className="exercise-record__check">
          <input
            type="checkbox"
            checked={Boolean(exercise.completed)}
            onChange={onToggleComplete}
            aria-label="운동 완료"
          />
        </label>
        <div className="exercise-record__body">
          <div className="exercise-record__name">
            {exercise.name}
            {indexLabel && (
              <span className="exercise-record__index">{indexLabel}</span>
            )}
          </div>
          <div className="exercise-record__summary">
            {formatExerciseSummary(exercise)}
          </div>
          {difficultyLabel && (
            <div className="exercise-record__difficulty">{difficultyLabel}</div>
          )}
        </div>
      </div>
      <div className="exercise-record__actions">
        <button type="button" className="btn btn-text" onClick={onEdit}>
          수정
        </button>
        <button type="button" className="btn btn-text danger" onClick={onDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default ExerciseRecord;
