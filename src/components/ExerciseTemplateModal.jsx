import './ExerciseTemplateModal.css';
import { exerciseTemplates } from '../data/exerciseTemplates';

/**
 * 운동 템플릿 선택 모달
 */
function ExerciseTemplateModal({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3 id="template-modal-title">운동 선택</h3>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <div className="template-list">
          {exerciseTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className="template-list__item"
              onClick={() => onSelect(template)}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExerciseTemplateModal;
