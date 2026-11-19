import { randomUUID } from 'expo-crypto';
import type { SQLiteDatabase } from 'expo-sqlite';

import { choreRepository } from '../../lib/choreRepository';
import type { Chore } from './types';
import { validateChoreInput, type ChoreErrors, type ChoreInput } from './validation';

export type SaveChoreResult =
  | { ok: true; chore: Chore }
  | { ok: false; errors: ChoreErrors; formError?: string };

export async function saveChore(db: SQLiteDatabase, input: ChoreInput): Promise<SaveChoreResult> {
  const validation = validateChoreInput(input);
  if (!validation.ok) {
    return { ok: false, errors: validation.errors };
  }

  const chore: Chore = { id: randomUUID(), ...validation.value };
  try {
    await choreRepository.insert(db, chore);
    return { ok: true, chore };
  } catch (error) {
    console.error('saveChore failed', error);
    return {
      ok: false,
      errors: {},
      formError: 'Nie udało się zapisać obowiązku. Spróbuj ponownie.',
    };
  }
}
