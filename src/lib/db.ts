import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'chore-planner.db';

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;
  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE chores (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL CHECK (length(trim(name)) > 0),
        interval_days INTEGER NOT NULL
          CHECK (typeof(interval_days) = 'integer' AND interval_days > 0)
      );

      CREATE TABLE completions (
        id TEXT PRIMARY KEY NOT NULL,
        chore_id TEXT NOT NULL REFERENCES chores (id) ON DELETE RESTRICT,
        start_at TEXT NOT NULL,
        end_at TEXT NOT NULL,
        notes TEXT,
        CHECK (end_at > start_at)
      );

      CREATE INDEX idx_completions_chore_id ON completions (chore_id);
      CREATE INDEX idx_completions_start_at ON completions (start_at);
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
}
