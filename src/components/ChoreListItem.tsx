import { Pressable, StyleSheet, Text } from 'react-native';

import { formatInterval } from '../features/chores/format';
import type { Chore } from '../features/chores/types';
import { colors, fontSize, spacing } from './theme';

type Props = {
  chore: Chore;
  onPress: () => void;
};

export function ChoreListItem({ chore, onPress }: Props) {
  const interval = formatInterval(chore.intervalDays);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${chore.name}, ${interval}`}
      accessibilityHint="Otwiera szczegóły obowiązku"
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Text style={styles.name} numberOfLines={2}>
        {chore.name}
      </Text>
      <Text style={styles.interval}>{interval}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 56,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
  name: {
    fontSize: fontSize.title,
    fontWeight: '600',
    color: colors.text,
  },
  interval: {
    fontSize: fontSize.body,
    color: colors.muted,
  },
});
