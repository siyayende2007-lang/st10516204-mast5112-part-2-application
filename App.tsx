import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ManageMenuScreen from './src/screens/ManageMenuScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { colors } from './src/theme';
import { MenuItem, RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // The one shared menu array. Every screen reads from this same list.
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} menuItems={menuItems} />}
          </Stack.Screen>
          <Stack.Screen name="ManageMenu">
            {(props) => (
              <ManageMenuScreen {...props} menuItems={menuItems} addMenuItem={addMenuItem} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
