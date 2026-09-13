import './DailySummary.css';
import {
  aggregateByType,
  formatAggregate,
} from '../data/exerciseTemplates';

/**
 * 하루 운동 요약
 */
function DailySummary({ exercises }) {
  if (!exercises.length) return null;

  const aggregates = aggregateByType(exercises);
  const typeCount = aggregates.length;

  return (
    <section className="daily-summary card">
      <h3 className="daily-summary__title">오늘 운동 요약</h3>
      <p className="daily-summary__meta">운동 종류: {typeCount}개</p>
      <ul className="daily-summary__list">
        {aggregates.map((agg) => (
          <li key={agg.type}>
            <strong>{agg.name}</strong>
            <span>{formatAggregate(agg)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DailySummary;
