import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

// Tab configuration mapping to NativeTabs triggers
interface TabItem {
  name: string;
  label: string;
  sf: string; // SF Symbols identifier (iOS)
  android?: string; // Android drawable resource name
}

const tabConfig: TabItem[] = [
  {
    name: 'index',
    label: 'Home',
    sf: 'house',
    android: 'ic_activity',
  },
  {
    name: 'tasks',
    label: 'Tasks',
    sf: 'checklist',
    android: 'ic_activity',
  },
  { name: 'reminders', label: 'Reminders', sf: 'bell', android: 'ic_metrics' },
  {
    name: 'journals',
    label: 'Journals',
    sf: 'book.closed',
    android: 'ic_journals',
  },
  { name: 'groups', label: 'Groups', sf: 'person.3', android: 'ic_profile' },
];

const asSymbol = (value: string) => value as unknown as /* Icon expects union */ never;

export default function TabLayout() {
  return (
    <NativeTabs iconColor="#966E4F">
      {tabConfig.map((t) => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <Label>{''}</Label>
          <Icon sf={asSymbol(t.sf)} drawable={t.android} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
