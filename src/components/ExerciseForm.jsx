import { useState, useEffect } from 'react';
import './ExerciseForm.css';
import {
  DIFFICULTY_OPTIONS,
  getTemplateById,
} from '../data/exerciseTemplates';

/**
 * 운동 입력/수정 폼
 * 템플릿의 inputType에 따라 입력 필드가 달라집니다.
 */
function ExerciseForm({ template, initialValues, onSubmit, onCancel, submitLabel = '저장' }) {
  const tpl = template || getTemplateById(initialValues?.type);
  const defaults = tpl?.defaults ?? {};

  const [minutes, setMinutes] = useState('');
  const [distance, setDistance] = useState('');
  const [seconds, setSeconds] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValues) {
      setMinutes(initialValues.minutes ?? '');
      setDistance(initialValues.distance ?? '');
      setSeconds(initialValues.seconds ?? '');
      setReps(initialValues.reps ?? '');
      setSets(initialValues.sets ?? '');
      setDifficulty(initialValues.difficulty ?? '');
      return;
    }

    setMinutes(defaults.minutes ?? '');
    setDistance(defaults.distance ?? '');
    setSeconds(defaults.seconds ?? '');
    setReps(defaults.reps ?? '');
    setSets(defaults.sets ?? '');
    setDifficulty('');
    setError('');
  }, [tpl?.id, initialValues]);

  if (!tpl) return null;

  function positiveNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = {
      type: tpl.id,
      difficulty: difficulty || undefined,
    };

    if (tpl.inputType === 'time') {
      if (!positiveNumber(minutes)) {
        setError('시간을 1분 이상 입력해 주세요.');
        return;
      }
      payload.minutes = Number(minutes);
      if (distance !== '' && distance != null) {
        if (!positiveNumber(distance)) {
          setError('거리는 0보다 큰 숫자여야 합니다.');
          return;
        }
        payload.distance = Number(distance);
      }
    }

    if (tpl.inputType === 'timeSets') {
      if (!positiveNumber(seconds)) {
        setError('시간을 1초 이상 입력해 주세요.');
        return;
      }
      if (!positiveNumber(sets)) {
        setError('세트를 1 이상 입력해 주세요.');
        return;
      }
      payload.seconds = Number(seconds);
      payload.sets = Number(sets);
    }

    if (tpl.inputType === 'repsSets') {
      if (!positiveNumber(reps)) {
        setError('횟수를 1회 이상 입력해 주세요.');
        return;
      }
      if (!positiveNumber(sets)) {
        setError('세트를 1 이상 입력해 주세요.');
        return;
      }
      payload.reps = Number(reps);
      payload.sets = Number(sets);
    }

    onSubmit(payload);
  }

  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <h3 className="exercise-form__title">{tpl.name}</h3>

      {tpl.inputType === 'time' && (
        <>
          <label className="field">
            <span>시간</span>
            <div className="field__row">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="예: 40"
              />
              <span className="field__unit">분</span>
            </div>
          </label>
          <label className="field">
            <span>
              거리 <em className="optional">(선택)</em>
            </span>
            <div className="field__row">
              <input
                type="number"
                inputMode="decimal"
                min="0.1"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="예: 3.2"
              />
              <span className="field__unit">km</span>
            </div>
          </label>
        </>
      )}

      {tpl.inputType === 'timeSets' && (
        <>
          <label className="field">
            <span>시간</span>
            <div className="field__row">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="예: 5"
              />
              <span className="field__unit">{tpl.timeUnit}</span>
            </div>
          </label>
          <label className="field">
            <span>세트</span>
            <div className="field__row">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="예: 3"
              />
            </div>
          </label>
        </>
      )}

      {tpl.inputType === 'repsSets' && (
        <>
          <label className="field">
            <span>횟수</span>
            <div className="field__row">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="예: 3"
              />
              <span className="field__unit">회</span>
            </div>
          </label>
          <label className="field">
            <span>세트</span>
            <div className="field__row">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="예: 1"
              />
            </div>
          </label>
        </>
      )}

      <fieldset className="difficulty">
        <legend>
          운동 느낌 <em className="optional">(선택)</em>
        </legend>
        <div className="difficulty__options">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <label key={opt.id} className="difficulty__option">
              <input
                type="radio"
                name="difficulty"
                value={opt.id}
                checked={difficulty === opt.id}
                onChange={() => setDifficulty(opt.id)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="form-error">{error}</p>}

      <div className="exercise-form__actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ExerciseForm;
