import { useState } from 'react';
import './DayDetail.css';
import { formatFullDate, isToday, toDateKey } from '../utils/dateHelpers';
import ExerciseList from './ExerciseList';
import ExerciseTemplateModal from './ExerciseTemplateModal';
import ExerciseForm from './ExerciseForm';
import DailySummary from './DailySummary';
import DailyMemo from './DailyMemo';

/**
 * 선택한 날짜의 운동 기록 화면
 */
function DayDetail({
  selectedDate,
  dayData,
  onAdd,
  onUpdate,
  onDelete,
  onToggleComplete,
  onMemoChange,
  onClearDay,
}) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const dateKey = toDateKey(selectedDate);
  const exercises = dayData.exercises ?? [];
  const titlePrefix = isToday(selectedDate) ? '오늘의 운동' : '이 날의 운동';

  function openAdd() {
    setEditingExercise(null);
    setSelectedTemplate(null);
    setShowTemplates(true);
  }

  function handleTemplateSelect(template) {
    setSelectedTemplate(template);
    setShowTemplates(false);
    setShowFormModal(true);
  }

  function handleEdit(exercise) {
    setEditingExercise(exercise);
    setSelectedTemplate(null);
    setShowFormModal(true);
  }

  function handleFormSubmit(payload) {
    if (editingExercise) {
      onUpdate(dateKey, editingExercise.id, payload);
    } else {
      onAdd(dateKey, payload);
    }
    setShowFormModal(false);
    setEditingExercise(null);
    setSelectedTemplate(null);
  }

  function handleFormCancel() {
    setShowFormModal(false);
    setEditingExercise(null);
    setSelectedTemplate(null);
  }

  function handleDelete(exercise) {
    const ok = window.confirm('이 운동 기록을 삭제하시겠습니까?');
    if (ok) onDelete(dateKey, exercise.id);
  }

  function handleClearDay() {
    if (!exercises.length && !dayData.memo) return;
    const ok = window.confirm(
      '이 날짜의 모든 운동 기록과 메모를 삭제하시겠습니까?',
    );
    if (ok) onClearDay(dateKey);
  }

  return (
    <section className="day-detail">
      <div className="day-detail__header card">
        <div>
          <p className="day-detail__date">{formatFullDate(selectedDate)}</p>
          <h2 className="day-detail__title">{titlePrefix}</h2>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          운동 추가
        </button>
      </div>

      <DailySummary exercises={exercises} />

      <div className="card">
        <ExerciseList
          exercises={exercises}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={(ex) => onToggleComplete(dateKey, ex.id)}
        />

        {(exercises.length > 0 || dayData.memo) && (
          <div className="day-detail__danger">
            <button
              type="button"
              className="btn btn-text danger"
              onClick={handleClearDay}
            >
              하루 전체 기록 삭제
            </button>
          </div>
        )}
      </div>

      <DailyMemo value={dayData.memo || ''} onChange={onMemoChange} />

      <ExerciseTemplateModal
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleTemplateSelect}
      />

      {showFormModal && (
        <div
          className="modal-backdrop"
          onClick={handleFormCancel}
          role="presentation"
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <ExerciseForm
              template={selectedTemplate}
              initialValues={editingExercise}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              submitLabel={editingExercise ? '수정 저장' : '저장'}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default DayDetail;
