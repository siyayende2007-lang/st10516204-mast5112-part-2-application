import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Black filled button by default, or an outlined button when `outline` is set.
export default function AppButton({ title, onPress, outline = false, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, outline ? styles.outline : styles.filled, style]}
    >
      <Text style={[styles.label, { color: outline ? colors.text : '#FFFFFF' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.text,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
