import './MonthlyStats.css';
import { formatYearMonth } from '../utils/dateHelpers';
import {
  calculateMonthlyStats,
  formatMonthlyStatLine,
} from '../utils/stats';

/**
 * 이번 달 간단 통계 카드
 */
function MonthlyStats({ records, viewDate }) {
  const stats = calculateMonthlyStats(records, viewDate);
  const monthLabel = formatYearMonth(viewDate).replace(/\d{4}년\s*/, '');

  return (
    <section className="monthly-stats card">
      <h3 className="monthly-stats__title">{monthLabel} 운동 기록</h3>

      <div className="stat-grid">
        <div className="stat-card stat-card--primary">
          <span className="stat-card__label">운동한 날</span>
          <span className="stat-card__value">{stats.workoutDays}일</span>
        </div>

        {stats.byType.map((agg) => (
          <div key={agg.type} className="stat-card">
            <span className="stat-card__label">{agg.name}</span>
            <span className="stat-card__value">{formatMonthlyStatLine(agg)}</span>
          </div>
        ))}
      </div>

      {stats.workoutDays === 0 && (
        <p className="monthly-stats__empty">이번 달 기록이 아직 없습니다.</p>
      )}
    </section>
  );
}

export default MonthlyStats;
