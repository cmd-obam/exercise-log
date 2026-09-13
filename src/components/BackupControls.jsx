import { useRef } from 'react';
import './BackupControls.css';

/**
 * JSON 내보내기 / 불러오기
 */
function BackupControls({ onExport, onImport }) {
  const fileRef = useRef(null);

  function handleExport() {
    const json = onExport();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exercise-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImport(String(reader.result));
        alert('기록을 불러왔습니다.');
      } catch (err) {
        alert(err.message || '불러오기에 실패했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <section className="backup-controls card">
      <h3 className="backup-controls__title">데이터 백업</h3>
      <p className="backup-controls__desc">
        기록을 JSON 파일로 내보내거나, 백업 파일을 불러올 수 있습니다.
      </p>
      <div className="backup-controls__actions">
        <button type="button" className="btn btn-secondary" onClick={handleExport}>
          JSON 내보내기
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => fileRef.current?.click()}
        >
          JSON 불러오기
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
}

export default BackupControls;
