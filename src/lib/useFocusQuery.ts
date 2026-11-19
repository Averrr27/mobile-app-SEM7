import { useFocusEffect } from 'expo-router';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useCallback, useState } from 'react';

export type QueryState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error' };

export function useFocusQuery<T>(query: (db: SQLiteDatabase) => Promise<T>) {
  const db = useSQLiteContext();
  const [state, setState] = useState<QueryState<T>>({ status: 'loading' });

  const load = useCallback(() => {
    let active = true;
    query(db)
      .then((data) => {
        if (active) setState({ status: 'ready', data });
      })
      .catch((error: unknown) => {
        console.error('query failed', error);
        if (active) setState({ status: 'error' });
      });
    return () => {
      active = false;
    };
  }, [db, query]);

  useFocusEffect(load);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    load();
  }, [load]);

  return { state, retry };
}
