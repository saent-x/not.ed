import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

// Tab configuration mapping to NativeTabs triggers
interface TabItem {
  name: string;
  label: string;
  sf: string; // SF Symbols identifier (iOS)
  android?: string; // Android drawable resource name
}

const tabConfig: TabItem[] = [
  { name: "index", label: "Home", sf: "house.fill", android: "ic_home" },
  {
    name: "activity",
    label: "Activity",
    sf: "checkmark.square",
    android: "ic_activity",
  },
  { name: "journals", label: "Journals", sf: "book", android: "ic_journals" },
  { name: "metrics", label: "Metrics", sf: "chart.bar", android: "ic_metrics" },
  { name: "profile", label: "Profile", sf: "person", android: "ic_profile" },
];


const asSymbol = (value: string) =>
  value as unknown as /* Icon expects union */ never;

export default function TabLayout() {
  return (
    <NativeTabs iconColor="#cc9469" labelStyle={{ color: "#cc9469" }}>
      {tabConfig.map((t) => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <Label>{t.label}</Label>
          <Icon sf={asSymbol(t.sf)} drawable={t.android} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
