import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { colors, spacing } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Christoffel</Text>
      <Text style={styles.subtitle}>PRIVATE CHEF</Text>

      <View style={styles.divider} />

      <AppButton
        title="I'm the Chef"
        onPress={() => navigation.navigate('Home', { role: 'chef' })}
      />
      <AppButton
        title="I'm a Guest"
        outline
        style={styles.guestButton}
        onPress={() => navigation.navigate('Home', { role: 'guest' })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 44,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    letterSpacing: 3,
    textAlign: 'center',
    color: colors.muted,
    marginTop: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  guestButton: {
    marginTop: spacing.md,
  },
});
