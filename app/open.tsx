import { Redirect } from "expo-router";

// Route for `termoz://open` links. OpenLinkHost at the root does the
// work through its Linking listener; this only stops an unmatched route.
export default function OpenLink() {
  return <Redirect href="/(tabs)/hosts" />;
}
