import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { HomeScreen } from './screens/MainScreen';
import { WeatherScreen } from './screens/WeatherScreen';

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Weather' component={WeatherScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
