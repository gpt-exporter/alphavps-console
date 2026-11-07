import { Redirect } from "expo-router";

// `termoz://widget/snippets` - the snippets list.
export default function WidgetSnippets() {
  return <Redirect href="/(tabs)/hosts" />;
}
