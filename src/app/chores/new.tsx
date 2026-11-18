import { Stack, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { colors, fontSize, spacing } from '../../components/theme';
import { saveChore } from '../../features/chores/saveChore';
import type { ChoreErrors } from '../../features/chores/validation';

export default function NewChoreScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [intervalDays, setIntervalDays] = useState('');
  const [errors, setErrors] = useState<ChoreErrors>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setFormError(undefined);
    const result = await saveChore(db, { name, intervalDays });
    if (result.ok) {
      router.replace({
        pathname: '/chores/[id]',
        params: { id: result.chore.id, created: '1' },
      });
      return;
    }
    setErrors(result.errors);
    setFormError(result.formError);
    setSaving(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: 'Nowy obowiązek' }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextField
          label="Nazwa"
          placeholder="np. Odkurzanie"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
          autoFocus
          returnKeyType="next"
        />
        <TextField
          label="Interwał (dni)"
          placeholder="np. 7"
          value={intervalDays}
          onChangeText={(text) => {
            setIntervalDays(text);
            setErrors((prev) => ({ ...prev, intervalDays: undefined }));
          }}
          error={errors.intervalDays}
          keyboardType="number-pad"
        />
        {formError ? (
          <Text style={styles.formError} accessibilityRole="alert">
            {formError}
          </Text>
        ) : null}
        <PrimaryButton
          label={saving ? 'Zapisywanie...' : 'Zapisz'}
          onPress={handleSave}
          disabled={saving}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  formError: {
    fontSize: fontSize.body,
    color: colors.danger,
  },
});
