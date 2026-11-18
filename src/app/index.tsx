import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoreListItem } from '../components/ChoreListItem';
import { PrimaryButton } from '../components/PrimaryButton';
import { StateMessage } from '../components/StateMessage';
import { colors, spacing } from '../components/theme';
import { useChores } from '../features/chores/useChores';

export default function ChoreListScreen() {
  const router = useRouter();
  const { state, retry } = useChores();

  const openNewChore = () => router.push('/chores/new');

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
        message="Nie udało się wczytać obowiązków."
        actionLabel="Spróbuj ponownie"
        onAction={retry}
      />
    );
  } else if (state.data.length === 0) {
    content = (
      <StateMessage
        message="Nie masz jeszcze żadnych obowiązków."
        actionLabel="Dodaj obowiązek"
        onAction={openNewChore}
      />
    );
  } else {
    content = (
      <>
        <FlatList
          data={state.data}
          keyExtractor={(chore) => chore.id}
          renderItem={({ item }) => (
            <ChoreListItem chore={item} onPress={() => router.push(`/chores/${item.id}`)} />
          )}
          contentContainerStyle={styles.list}
        />
        <View style={styles.footer}>
          <PrimaryButton label="Dodaj obowiązek" onPress={openNewChore} />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Obowiązki' }} />
      {content}
    </SafeAreaView>
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
  list: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
