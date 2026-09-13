import './Calendar.css';
import CalendarDay from './CalendarDay';
import {
  formatYearMonth,
  getCalendarDays,
  addMonths,
  subMonths,
  toDateKey,
} from '../utils/dateHelpers';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 월간 캘린더
 * - 이전/다음 달, 오늘로 이동
 * - 기록이 있는 날짜에 표시
 */
function Calendar({
  viewDate,
  onViewDateChange,
  selectedDate,
  onSelectDate,
  records,
}) {
  const days = getCalendarDays(viewDate);

  function getCount(date) {
    const key = toDateKey(date);
    return records[key]?.exercises?.length ?? 0;
  }

  return (
    <section className="calendar card">
      <div className="calendar__header">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onViewDateChange(subMonths(viewDate, 1))}
          aria-label="이전 달"
        >
          ‹
        </button>
        <h2 className="calendar__title">{formatYearMonth(viewDate)}</h2>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onViewDateChange(addMonths(viewDate, 1))}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="calendar__toolbar">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            const today = new Date();
            onViewDateChange(today);
            onSelectDate(today);
          }}
        >
          오늘
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__grid">
        {days.map((date) => (
          <CalendarDay
            key={toDateKey(date)}
            date={date}
            viewDate={viewDate}
            selectedDate={selectedDate}
            exerciseCount={getCount(date)}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </section>
  );
}

export default Calendar;
