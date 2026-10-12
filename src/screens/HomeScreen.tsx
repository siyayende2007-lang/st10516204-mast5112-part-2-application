import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import MenuItemRow from '../components/MenuItemRow';
import { ScreenProps } from '../navigation/types';
import { useMenu } from '../state/MenuContext';
import { colors, fonts, spacing } from '../theme';

export default function HomeScreen({ navigation, route }: ScreenProps<'Home'>) {
  const { menuItems } = useMenu();
  const isChef = route.params.role === 'chef';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Tonight's Menu</Text>
        <Text style={styles.count}>Total items on the menu: {menuItems.length}</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No dishes yet"
            message={
              isChef
                ? 'Tap "Manage Menu" to add your first dish.'
                : 'The chef has not added any dishes yet. Check back soon.'
            }
          />
        }
      />

      {isChef && (
        <View style={styles.footer}>
          <AppButton title="Manage Menu" onPress={() => navigation.navigate('ManageMenu')} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.text,
  },
  count: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});
