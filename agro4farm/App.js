import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function WeatherScreen() {

  const [weather, setWeather] = useState()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const api = {
    link: "https://api.openweathermap.org/data/2.5/",
    key: "5eadd4755631169fa5a9ca425ce2f238"
  }

  const fetchWeather = useCallback(() => {
    setIsLoading(true)
    setInput('')
    axios({
      method: 'GET',
      url: `${api.link}weather?q=${input}&units=metric&appid=${api.key}`
    }).then(
      res => {
        // console.log(res.data)
        setWeather(res.data)
      }
    ).catch(
      e => console.dir(e)
    ).finally(
      () => setIsLoading(false)
    )

  }, [api.key, input])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.cityInput}
        placeholder='Choose city'
        onChangeText={text => setInput(text)}
        value={input}
        onSubmitEditing={fetchWeather}
      />
      {isLoading && (
        <ActivityIndicator
          color="orange"
          size="large"
        />
      )}
      {weather && (
        <View>
          <Text style={styles.weatherDataLocation}>
            {`${weather?.name} ${weather?.sys?.country}`}
          </Text>
          <Text style={styles.weatherDataTemperature}>
            {`${Math.round(weather?.main?.temp)} Celsius`}
          </Text>
        </View>
      )}
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityInput: {
    padding: 10,
    width: '50%',
    backgroundColor: 'gray',
    borderRadius: 50
  },
  weatherDataLocation: {
    marginTop: 5,
    textAlign: 'center',
    color: 'orange',
    fontSize: 30
  },
  weatherDataTemperature: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 20
  }
});
