import { Layout, Icon, Text, Button, useTheme } from '@ui-kitten/components'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, StatusBar, Platform, Image } from 'react-native'
import { TempIcon } from '../assets/icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationDot, faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'

export function WeatherLocationScreen() {

    const [weather, setWeather] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [test, setTest] = useState('0')

    const api = {
        link: "https://api.openweathermap.org/data/2.5/weather?",
        key: "5eadd4755631169fa5a9ca425ce2f238"
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    async function fetchWeather() {
        try {
            // Get Location
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Dostęp do lokalizacji jest potrzebny do prawidłowego działania aplikacji')
                return
            }
            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords

            // Fetch weather
            const URL = `${api.link}lat=${latitude}&lon=${longitude}&lang=pl&units=metric&appid=${api.key}`

            const weatherFetch = await fetch(URL)
            const result = await weatherFetch.json()
            if (weatherFetch.ok) {
                setWeather(result)
            } else {
                setErrorMsg(result.message)
            }

        } catch (e) {
            setErrorMsg(e.message)
        }
    }

    const checkClouds = (w) => {
        if((w.weather[0].main).toLowerCase() == 'clouds'){
            if(w.clouds.all > 80){
                return dictionary[(w.weather[0].main).toLowerCase()]
            }
            return dictionary['fewClouds']
        }
        return false
    }

    const dictionary = {}
    dictionary['clear'] = <Image source={require('../assets/weatherIcons/png/clear.png')} style={{ width: 256, height: 256 }} />
    dictionary['clouds'] = <Image source={require('../assets/weatherIcons/png/clouds.png')} style={{ width: 256, height: 256 }} />
    dictionary['drizzle'] = <Image source={require('../assets/weatherIcons/png/drizzle.png')} style={{ width: 256, height: 256 }} />
    dictionary['rain'] = <Image source={require('../assets/weatherIcons/png/rain.png')} style={{ width: 256, height: 256 }} />
    dictionary['thunderstorm'] = <Image source={require('../assets/weatherIcons/png/thunderstorm.png')} style={{ width: 256, height: 256 }} />
    dictionary['snow'] = <Image source={require('../assets/weatherIcons/png/snow.png')} style={{ width: 256, height: 256 }} />
    dictionary['mist'] = <Image source={require('../assets/weatherIcons/png/mist.png')} style={{ width: 256, height: 256 }} />
    dictionary['fewClouds'] = <Image source={require('../assets/weatherIcons/png/fewClouds.png')} style={{ width: 256, height: 256 }} />

    const theme = useTheme()
    const style = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            padding: 30,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },

        weatherContainer: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 25,
            marginTop: 25,
            marginBottom: 25,
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        weatherDescription: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 25,
            marginBottom: 25,
            padding: 10,
        },
        dayContainer: {
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 25,
            padding: 10,
        },

        icon: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        temperature: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        location: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        sunrise: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        sunset: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {
            textTransform: 'capitalize',
            color: theme['color-primary-500'],
            fontWeight: 'bold',
            fontFamily: 'Roboto',
        },

    })

    if (weather) {
        const { main: { temp } } = weather
        const { name } = weather

        return (
            <Layout style={style.container}>
                <View style={style.weatherContainer}>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={style.icon}>
                            {
                                checkClouds(weather) ? checkClouds(weather) : dictionary[(weather.weather[0].main).toLowerCase()]
                            }
                        </View>
                        <View style={style.temperature}>
                            <FontAwesomeIcon size={21} style={{ color: theme['color-primary-500'] }} icon={faTemperatureEmpty} />
                            <Text category='h1' style={style.text}>&nbsp;{Math.round(temp)}°C</Text>
                        </View>
                    </View>

                    <View style={style.location}>
                        <FontAwesomeIcon style={{ color: theme['color-primary-500'] }} icon={faLocationDot} />
                        <Text category='h4' style={style.text}>&nbsp;{name}</Text>
                    </View>

                </View>
                <View style={style.weatherDescription}>
                    <Text category='h5' style={style.text} >{weather.weather[0].description}</Text>
                </View>
                <View style={style.dayContainer}>
                    <View style={style.sunrise}>
                        <Text style={style.text}>{weather.sys.sunrise}</Text>
                    </View>
                    <View style={style.sunset}>
                        <Text style={style.text}>{weather.sys.sunset}</Text>
                    </View>
                </View>
            </Layout>
        )
    } else {

        return (
            <View style={style.container}>
                <Text>
                    {errorMsg}
                </Text>
            </View>
        )
    }

}