import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StateMessage } from '../../components/StateMessage';
import { colors, fontSize, spacing } from '../../components/theme';
import { formatInterval } from '../../features/chores/format';
import { useChore } from '../../features/chores/useChores';

export default function ChoreDetailsScreen() {
  const router = useRouter();
  const { id, created } = useLocalSearchParams<{ id: string; created?: string }>();
  const { state, retry } = useChore(id);

  let content;
  if (state.status === 'loading') {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Wczytywanie" />
      </View>
    );
  } else if (state.status === 'error') {
    content = (
      <StateMessage
        tone="error"
        message="Nie udało się wczytać obowiązku."
        actionLabel="Spróbuj ponownie"
        onAction={retry}
      />
    );
  } else if (state.data === null) {
    content = (
      <StateMessage
        message="Nie znaleziono obowiązku."
        actionLabel="Wróć do listy"
        onAction={() => router.dismissTo('/')}
      />
    );
  } else {
    const chore = state.data;
    content = (
      <ScrollView contentContainerStyle={styles.content}>
        {created === '1' ? (
          <Text style={styles.success} accessibilityRole="alert">
            Zapisano obowiązek.
          </Text>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.label}>Nazwa</Text>
          <Text style={styles.value}>{chore.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Interwał</Text>
          <Text style={styles.value}>{formatInterval(chore.intervalDays)}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Szczegóły obowiązku' }} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  success: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.successBackground,
    color: colors.successText,
    fontSize: fontSize.body,
  },
  row: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.body,
    color: colors.muted,
  },
  value: {
    fontSize: fontSize.heading,
    fontWeight: '600',
    color: colors.text,
  },
});
