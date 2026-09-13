import { useState, useCallback } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DayDetail from './components/DayDetail';
import MonthlyStats from './components/MonthlyStats';
import StreakBadge from './components/StreakBadge';
import BackupControls from './components/BackupControls';
import { useExerciseRecords } from './hooks/useExerciseRecords';
import { toDateKey, isSameDay } from './utils/dateHelpers';

function App() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const {
    records,
    getDay,
    addExercise,
    updateExercise,
    deleteExercise,
    toggleExerciseCompleted,
    updateMemo,
    clearDay,
    exportJson,
    importJson,
  } = useExerciseRecords();

  const dateKey = toDateKey(selectedDate);
  const dayData = getDay(dateKey);

  const handleMemoChange = useCallback(
    (memo) => {
      updateMemo(dateKey, memo);
    },
    [dateKey, updateMemo],
  );

  function goToToday() {
    const now = new Date();
    setViewDate(now);
    setSelectedDate(now);
    // 스크롤을 상세로 이동
    document.getElementById('day-detail')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Personal Log</p>
          <h1 className="app__title">운동 기록</h1>
        </div>
        {!isSameDay(selectedDate, today) && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={goToToday}>
            오늘 운동 바로가기
          </button>
        )}
      </header>

      <StreakBadge records={records} />

      <Calendar
        viewDate={viewDate}
        onViewDateChange={setViewDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        records={records}
      />

      <div id="day-detail">
        <DayDetail
          selectedDate={selectedDate}
          dayData={dayData}
          onAdd={addExercise}
          onUpdate={updateExercise}
          onDelete={deleteExercise}
          onToggleComplete={toggleExerciseCompleted}
          onMemoChange={handleMemoChange}
          onClearDay={clearDay}
        />
      </div>

      <MonthlyStats records={records} viewDate={viewDate} />

      <BackupControls onExport={exportJson} onImport={importJson} />

      <footer className="app__footer">
        기록은 이 브라우저에만 저장됩니다. 백업을 권장해요.
      </footer>
    </div>
  );
}

export default App;
