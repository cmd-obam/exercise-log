import './CalendarDay.css';
import { isSameDay, isSameMonth, isToday, toDateKey } from '../utils/dateHelpers';

/**
 * 캘린더의 하루 칸
 */
function CalendarDay({ date, viewDate, selectedDate, exerciseCount, onSelect }) {
  const outside = !isSameMonth(date, viewDate);
  const today = isToday(date);
  const selected = selectedDate && isSameDay(date, selectedDate);
  const hasRecord = exerciseCount > 0;

  const classNames = [
    'calendar-day',
    outside && 'is-outside',
    today && 'is-today',
    selected && 'is-selected',
    hasRecord && 'has-record',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => onSelect(date)}
      aria-label={`${toDateKey(date)}${hasRecord ? `, 운동 ${exerciseCount}개` : ''}`}
    >
      <span className="calendar-day__number">{date.getDate()}</span>
      {hasRecord && (
        <span className="calendar-day__marker" aria-hidden="true">
          <span className="calendar-day__dot" />
          {exerciseCount > 1 && (
            <span className="calendar-day__count">{exerciseCount}</span>
          )}
        </span>
      )}
    </button>
  );
}

export default CalendarDay;
