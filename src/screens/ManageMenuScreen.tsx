import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import MenuItemRow from '../components/MenuItemRow';
import { colors, spacing } from '../theme';
import { COURSES, MenuItem, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageMenu'> & {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
};

export default function ManageMenuScreen({ navigation, menuItems, addMenuItem }: Props) {
  // What the chef has typed so far
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');

  // Feedback messages shown under the button
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = () => {
    setSuccess('');

    // Validation: every field is required and price must be a positive number
    if (!name.trim() || !description.trim() || !price.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError('Price must be a number greater than 0.');
      return;
    }

    addMenuItem({
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    });

    // Confirm and clear the form for the next dish
    setError('');
    setSuccess(`${name.trim()} was added to the menu.`);
    setName('');
    setDescription('');
    setCourse(COURSES[0]);
    setPrice('');
  };

  const form = (
    <View>
      <Text style={styles.label}>DISH NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Tomato Tartare"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Short description of the dish"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>COURSE</Text>
      <View style={[styles.input, { padding: 0 }]}>
        <Picker selectedValue={course} onValueChange={setCourse}>
          {COURSES.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>PRICE (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <AppButton title="Add to Menu" onPress={handleAdd} style={styles.addButton} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {success !== '' && <Text style={styles.success}>{success}</Text>}

      <Text style={styles.label}>ON THE MENU ({menuItems.length})</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Menu</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        ListHeaderComponent={form}
        ListEmptyComponent={
          <EmptyState title="Nothing here yet" message="Dishes you add will appear here." />
        }
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  back: {
    fontSize: 26,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
    color: colors.muted,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: colors.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    marginTop: spacing.lg,
  },
  error: {
    color: colors.error,
    marginTop: spacing.md,
  },
  success: {
    color: colors.success,
    marginTop: spacing.md,
  },
});
