import {
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Day from "./day";
import Week from "./week";
import Month from "./month";
import Year from "./year";

const MaterialTopTabs = createMaterialTopTabNavigator();

const Layout = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#966E4F'
        },
        tabBarStyle: {
          backgroundColor: "#f2ede8",
          borderColor: "red"
        },
      }}
      style={{ paddingTop: 95, backgroundColor: "#fcfaf7", borderWidth: 0 }}
    >
      <MaterialTopTabs.Screen name="DAY" component={Day} />
      <MaterialTopTabs.Screen name="WEEK" component={Week} />
      <MaterialTopTabs.Screen name="MONTH" component={Month} />
      <MaterialTopTabs.Screen name="YEAR" component={Year} />
    </MaterialTopTabs.Navigator>
  );
};

export default Layout;
