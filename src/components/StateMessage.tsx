import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from './PrimaryButton';
import { colors, fontSize, spacing } from './theme';

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'neutral' | 'error';
};

export function StateMessage({ message, actionLabel, onAction, tone = 'neutral' }: Props) {
  return (
    <View style={styles.container}>
      <Text
        accessibilityRole={tone === 'error' ? 'alert' : 'text'}
        style={[styles.message, tone === 'error' && styles.error]}
      >
        {message}
      </Text>
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  message: {
    fontSize: fontSize.title,
    color: colors.muted,
    textAlign: 'center',
  },
  error: {
    color: colors.danger,
  },
});
