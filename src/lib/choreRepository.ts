import type { SQLiteDatabase } from 'expo-sqlite';

import type { Chore } from '../features/chores/types';

type ChoreRow = {
  id: string;
  name: string;
  interval_days: number;
};

const SELECT_CHORE = 'SELECT id, name, interval_days FROM chores';

function toChore(row: ChoreRow): Chore {
  return {
    id: row.id,
    name: row.name,
    intervalDays: row.interval_days,
  };
}

async function insert(db: SQLiteDatabase, chore: Chore): Promise<void> {
  await db.runAsync(
    'INSERT INTO chores (id, name, interval_days) VALUES (?, ?, ?)',
    chore.id,
    chore.name,
    chore.intervalDays,
  );
}

async function getAll(db: SQLiteDatabase): Promise<Chore[]> {
  const rows = await db.getAllAsync<ChoreRow>(`${SELECT_CHORE} ORDER BY name COLLATE NOCASE`);
  return rows.map(toChore);
}

async function getById(db: SQLiteDatabase, id: string): Promise<Chore | null> {
  const row = await db.getFirstAsync<ChoreRow>(`${SELECT_CHORE} WHERE id = ?`, id);
  return row ? toChore(row) : null;
}

export const choreRepository = {
  insert,
  getAll,
  getById,
};
