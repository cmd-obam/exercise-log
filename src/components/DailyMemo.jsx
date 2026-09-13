import { useState, useEffect } from 'react';
import './DailyMemo.css';

/**
 * 날짜별 메모
 * 포커스를 벗어나거나 저장 버튼을 누르면 저장됩니다.
 */
function DailyMemo({ value, onChange }) {
  const [text, setText] = useState(value || '');

  useEffect(() => {
    setText(value || '');
  }, [value]);

  function save() {
    if (text !== (value || '')) {
      onChange(text);
    }
  }

  return (
    <section className="daily-memo card">
      <h3 className="daily-memo__title">오늘 메모</h3>
      <textarea
        className="daily-memo__input"
        rows={3}
        placeholder="컨디션, 업무, 느낀 점 등을 적어보세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
      />
      <div className="daily-memo__actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={save}>
          메모 저장
        </button>
      </div>
    </section>
  );
}

export default DailyMemo;
