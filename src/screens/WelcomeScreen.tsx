import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { ScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';

export default function WelcomeScreen({ navigation }: ScreenProps<'Welcome'>) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.title}>Christoffel</Text>
          <Text style={styles.subtitle}>PRIVATE CHEF</Text>
        </View>

        <View style={styles.divider} />

        <AppButton
          title="I'm the Chef"
          onPress={() => navigation.navigate('Home', { role: 'chef' })}
        />
        <AppButton
          title="I'm a Guest"
          variant="outline"
          style={styles.secondButton}
          onPress={() => navigation.navigate('Home', { role: 'guest' })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  brand: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 44,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    letterSpacing: 3,
    color: colors.muted,
    marginTop: spacing.sm,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  secondButton: {
    marginTop: spacing.md,
  },
});
