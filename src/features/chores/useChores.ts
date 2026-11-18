import type { SQLiteDatabase } from 'expo-sqlite';
import { useCallback } from 'react';

import { choreRepository } from '../../lib/choreRepository';
import { useFocusQuery } from '../../lib/useFocusQuery';

export function useChores() {
  return useFocusQuery(choreRepository.getAll);
}

export function useChore(id: string) {
  const query = useCallback((db: SQLiteDatabase) => choreRepository.getById(db, id), [id]);
  return useFocusQuery(query);
}
