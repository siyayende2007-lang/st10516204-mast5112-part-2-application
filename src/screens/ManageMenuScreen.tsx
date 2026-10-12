import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import MenuItemRow from '../components/MenuItemRow';
import { ScreenProps } from '../navigation/types';
import { useMenu } from '../state/MenuContext';
import { colors, fonts, radius, spacing } from '../theme';
import { Course, COURSES } from '../types';

type FormErrors = {
  name?: string;
  description?: string;
  price?: string;
};

export default function ManageMenuScreen({ navigation }: ScreenProps<'ManageMenu'>) {
  const { menuItems, addMenuItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starters');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (): FormErrors => {
    const found: FormErrors = {};
    if (!name.trim()) found.name = 'Please enter a dish name.';
    if (!description.trim()) found.description = 'Please enter a short description.';

    const priceValue = Number(price.replace(',', '.'));
    if (!price.trim()) {
      found.price = 'Please enter a price.';
    } else if (Number.isNaN(priceValue) || priceValue <= 0) {
      found.price = 'Price must be a number greater than 0.';
    }
    return found;
  };

  const handleAdd = () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSuccessMessage('');
      return;
    }

    addMenuItem({
      name: name.trim(),
      description: description.trim(),
      course,
      price: Number(price.replace(',', '.')),
    });

    setSuccessMessage(`"${name.trim()}" was added to the menu.`);
    setName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
  };

  const form = (
    <View>
      <Text style={styles.label}>DISH NAME</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="e.g. Tomato Tartare"
        placeholderTextColor={colors.muted}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.multiline, errors.description && styles.inputError]}
        placeholder="Short description of the dish"
        placeholderTextColor={colors.muted}
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text style={styles.label}>COURSE</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={course} onValueChange={(value) => setCourse(value)}>
          {COURSES.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>PRICE (R)</Text>
      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="0.00"
        placeholderTextColor={colors.muted}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <AppButton title="Add to Menu" onPress={handleAdd} style={styles.addButton} />

      {successMessage !== '' && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      <View style={styles.divider} />
      <Text style={styles.label}>ON THE MENU ({menuItems.length})</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Menu</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItemRow item={item} />}
          ListHeaderComponent={form}
          ListEmptyComponent={
            <EmptyState title="Nothing here yet" message="Dishes you add will appear here." />
          }
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backArrow: {
    fontSize: 26,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.muted,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background,
  },
  multiline: {
    minHeight: 80,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.error,
    marginTop: spacing.xs,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  addButton: {
    marginTop: spacing.lg,
  },
  successBanner: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  successText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.success,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
  },
});
