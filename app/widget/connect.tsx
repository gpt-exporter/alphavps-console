import { Redirect } from "expo-router";

// `termoz://widget/connect?hostId=...&type=...`
// useWidgetDeepLink opens the session; this only keeps the router happy.
export default function WidgetConnect() {
  return <Redirect href="/(tabs)/hosts" />;
}
