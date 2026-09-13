import { useState, useEffect, useCallback } from 'react';
import {
  loadRecords,
  saveRecords,
  exportRecordsAsJson,
  parseImportedJson,
} from '../utils/storage';
import { getTemplateById } from '../data/exerciseTemplates';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 운동 기록 CRUD 훅
 * 모든 데이터는 localStorage에 자동 저장됩니다.
 * 나중에 서버/Firebase로 바꿀 때는 이 훅 내부만 수정하면 됩니다.
 */
export function useExerciseRecords() {
  const [records, setRecords] = useState(() => loadRecords());

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  const getDay = useCallback(
    (dateKey) => records[dateKey] ?? { exercises: [], memo: '' },
    [records],
  );

  const addExercise = useCallback((dateKey, exerciseData) => {
    const template = getTemplateById(exerciseData.type);
    if (!template) return;

    const newExercise = {
      id: createId(),
      type: template.id,
      name: template.name,
      completed: false,
      ...exerciseData,
      name: template.name,
      type: template.id,
    };

    setRecords((prev) => {
      const day = prev[dateKey] ?? { exercises: [], memo: '' };
      return {
        ...prev,
        [dateKey]: {
          ...day,
          exercises: [...day.exercises, newExercise],
        },
      };
    });
  }, []);

  const updateExercise = useCallback((dateKey, exerciseId, updates) => {
    setRecords((prev) => {
      const day = prev[dateKey];
      if (!day) return prev;

      return {
        ...prev,
        [dateKey]: {
          ...day,
          exercises: day.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, ...updates } : ex,
          ),
        },
      };
    });
  }, []);

  const deleteExercise = useCallback((dateKey, exerciseId) => {
    setRecords((prev) => {
      const day = prev[dateKey];
      if (!day) return prev;

      const exercises = day.exercises.filter((ex) => ex.id !== exerciseId);
      const next = { ...prev };

      if (exercises.length === 0 && !day.memo) {
        delete next[dateKey];
      } else {
        next[dateKey] = { ...day, exercises };
      }

      return next;
    });
  }, []);

  const toggleExerciseCompleted = useCallback((dateKey, exerciseId) => {
    setRecords((prev) => {
      const day = prev[dateKey];
      if (!day) return prev;

      return {
        ...prev,
        [dateKey]: {
          ...day,
          exercises: day.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex,
          ),
        },
      };
    });
  }, []);

  const updateMemo = useCallback((dateKey, memo) => {
    setRecords((prev) => {
      const day = prev[dateKey] ?? { exercises: [], memo: '' };
      const trimmed = memo;

      if (day.exercises.length === 0 && !trimmed.trim()) {
        const next = { ...prev };
        delete next[dateKey];
        return next;
      }

      return {
        ...prev,
        [dateKey]: { ...day, memo: trimmed },
      };
    });
  }, []);

  const clearDay = useCallback((dateKey) => {
    setRecords((prev) => {
      const next = { ...prev };
      delete next[dateKey];
      return next;
    });
  }, []);

  const exportJson = useCallback(() => exportRecordsAsJson(records), [records]);

  const importJson = useCallback((jsonText) => {
    const data = parseImportedJson(jsonText);
    setRecords(data);
  }, []);

  return {
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
  };
}
