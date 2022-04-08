import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import { HomeScreen } from './screens/MainScreen'
import { WeatherScreen } from './screens/WeatherScreen'
import { LocationScreen } from './screens/LocationScreen'
import { WeatherLocationScreen } from './screens/WeatherLocationScreen'

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
        <Drawer.Screen name='Home' component={WeatherLocationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
