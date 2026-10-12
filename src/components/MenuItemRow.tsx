import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { MenuItem } from '../types';

export function formatPrice(price: number) {
  return `R${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

export default function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <View style={styles.row}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>{item.course.toUpperCase()}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  details: {
    flex: 1,
    paddingRight: spacing.md,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  course: {
    fontFamily: fonts.regular,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  price: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
  },
});
