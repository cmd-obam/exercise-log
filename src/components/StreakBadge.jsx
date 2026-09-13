import './StreakBadge.css';
import { calculateStreak } from '../utils/stats';

/**
 * 연속 운동 일수 배지
 */
function StreakBadge({ records }) {
  const streak = calculateStreak(records);

  if (streak <= 0) {
    return (
      <div className="streak-badge streak-badge--empty card">
        오늘 운동을 기록하고 연속 기록을 시작해 보세요
      </div>
    );
  }

  return (
    <div className="streak-badge card">
      <span className="streak-badge__icon" aria-hidden="true">
        🔥
      </span>
      <span>
        연속 운동 <strong>{streak}일</strong>
      </span>
    </div>
  );
}

export default StreakBadge;
