import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { HomeScreen } from './screens/MainScreen';
import { WeatherScreen } from './screens/WeatherScreen';
import { LocationScreen } from './screens/LocationScreen'

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Weather' component={WeatherScreen} />
        <Drawer.Screen name='Location' component={LocationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
