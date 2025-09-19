import {
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Index from.ndex";


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
      <MaterialTopTabs.Screen name="DAY" component={Index} />
    </MaterialTopTabs.Navigator>
  );
};

export default Layout;
