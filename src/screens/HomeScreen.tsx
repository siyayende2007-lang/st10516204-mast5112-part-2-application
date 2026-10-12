import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import MenuItemRow from '../components/MenuItemRow';
import { colors, spacing } from '../theme';
import { MenuItem, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItem[];
};

export default function HomeScreen({ navigation, route, menuItems }: Props) {
  const isChef = route.params.role === 'chef';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tonight's Menu</Text>
      <Text style={styles.count}>Total items on the menu: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        ListEmptyComponent={
          <EmptyState
            title="No dishes yet"
            message={
              isChef
                ? 'Tap "Manage Menu" to add your first dish.'
                : 'The chef has not added any dishes yet.'
            }
          />
        }
      />

      {/* Only the chef can add dishes */}
      {isChef && (
        <View style={styles.footer}>
          <AppButton title="Manage Menu" onPress={() => navigation.navigate('ManageMenu')} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
  },
  count: {
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.md,
  },
});
