export type ChoreInput = {
  name: string;
  intervalDays: string;
};

export type ChoreErrors = {
  name?: string;
  intervalDays?: string;
};

export type ValidChore = {
  name: string;
  intervalDays: number;
};

export type ChoreValidationResult =
  | { ok: true; value: ValidChore }
  | { ok: false; errors: ChoreErrors };

export const NAME_MAX_LENGTH = 100;

export function validateChoreInput(input: ChoreInput): ChoreValidationResult {
  const errors: ChoreErrors = {};

  const name = input.name.trim();
  if (name.length === 0) {
    errors.name = 'Podaj nazwę obowiązku.';
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Nazwa może mieć najwyżej ${NAME_MAX_LENGTH} znaków.`;
  }

  const intervalText = input.intervalDays.trim();
  const intervalDays = Number(intervalText);
  if (intervalText.length === 0) {
    errors.intervalDays = 'Podaj interwał w dniach.';
  } else if (!/^\d+$/.test(intervalText) || !Number.isSafeInteger(intervalDays) || intervalDays <= 0) {
    errors.intervalDays = 'Interwał musi być liczbą całkowitą większą od 0.';
  }

  if (errors.name || errors.intervalDays) {
    return { ok: false, errors };
  }
  return { ok: true, value: { name, intervalDays } };
}
