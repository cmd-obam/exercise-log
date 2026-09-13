/**
 * localStorage 읽기/쓰기 유틸
 * 나중에 Firebase나 API로 바꿀 때는 이 파일(또는 훅)만 교체하면 됩니다.
 */

const STORAGE_KEY = 'exercise-records-v1';

export function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    console.warn('운동 기록을 불러오지 못했습니다. 빈 데이터로 시작합니다.');
    return {};
  }
}

export function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

/** 백업용 JSON 문자열 */
export function exportRecordsAsJson(records) {
  return JSON.stringify(records, null, 2);
}

/** JSON 문자열을 파싱하고 기본 형태인지 검사 */
export function parseImportedJson(jsonText) {
  const data = JSON.parse(jsonText);
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('올바른 기록 형식이 아닙니다.');
  }
  return data;
}
