import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

export default function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    color: colors.text,
  },
  message: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
