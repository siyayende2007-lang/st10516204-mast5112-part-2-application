import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import { MenuItem } from '../types';

// One row in a menu list: name, description and course on the left, price on the right.
export default function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <View style={styles.row}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>{item.course.toUpperCase()}</Text>
      </View>
      <Text style={styles.price}>R{item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  details: {
    flex: 1,
    paddingRight: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  course: {
    fontSize: 11,
    letterSpacing: 1,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});
