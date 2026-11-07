import { Redirect } from "expo-router";

// Bare `termoz://widget`.
export default function WidgetIndex() {
  return <Redirect href="/(tabs)/hosts" />;
}
