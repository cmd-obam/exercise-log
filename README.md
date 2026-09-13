# 운동 기록

날짜별로 운동을 기록하고 확인할 수 있는 개인용 React 웹앱입니다.

데이터는 브라우저 **localStorage**에 저장되며, 서버 없이도 바로 사용할 수 있습니다.

## 주요 기능

- 월간 캘린더에서 날짜 선택
- 운동 템플릿 선택 후 수치 입력 (걷기 / 데드행 / 인클라인 팔굽혀펴기 / 크런치 / 레그레이즈)
- 하루에 같은 운동 여러 번 기록 + 종류별 총합
- 하루 요약, 메모, 운동 느낌(선택)
- 수정 / 삭제 / 완료 체크
- 이번 달 통계, 연속 운동 일수
- JSON 내보내기 / 불러오기

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 표시된 주소(보통 `http://localhost:5173`)로 접속합니다.

## 프로젝트 구조

```
src/
  components/     UI 컴포넌트 (캘린더, 목록, 폼 등)
  data/           운동 템플릿 정의
  hooks/          기록 상태 + localStorage 연동
  utils/          날짜, 저장소, 통계 유틸
  App.jsx         화면 조립
```

### 파일 역할

| 경로 | 역할 |
|------|------|
| `data/exerciseTemplates.js` | 운동 종류·입력 방식·기본값. 새 운동 추가는 여기부터 |
| `utils/storage.js` | localStorage 읽기/쓰기, JSON 백업 |
| `utils/dateHelpers.js` | 날짜 포맷, 캘린더 날짜 계산 |
| `utils/stats.js` | 월간 통계, 연속 일수 |
| `hooks/useExerciseRecords.js` | 기록 CRUD. 나중에 Firebase/API로 교체하기 쉬운 지점 |
| `components/Calendar.jsx` | 월간 캘린더 |
| `components/DayDetail.jsx` | 선택한 날짜의 기록 화면 |
| `components/ExerciseForm.jsx` | 운동별 입력 폼 |
| `components/DailySummary.jsx` | 하루 요약 |
| `components/MonthlyStats.jsx` | 이번 달 통계 |

## 새 운동 추가하기

`src/data/exerciseTemplates.js`에 항목을 추가하면 됩니다.

```js
{
  id: 'pullup',
  name: '풀업',
  inputType: 'repsSets', // time | timeSets | repsSets
  defaults: { reps: 5, sets: 3 },
}
```

## 빌드

```bash
npm run build
npm run preview
```
