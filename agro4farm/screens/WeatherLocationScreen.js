import { faGaugeHigh, faLocationDot, faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export function WeatherLocationScreen() {
    const theme = useTheme()
    const style = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            padding: 20,
        },

        weatherContainer: {
            flex: 4,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 25,
            marginTop: 5,
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
            alignItems: 'flex-end',
            paddingVertical: 10,
            paddingHorizontal: 5,
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
        textPressure: {
            color: theme['color-primary-500'],
            fontWeight: 'bold',
            fontFamily: 'Roboto',
        },
        errorContainer: {
            flex: 1,
            alignItems: 'center',
        },
        error: {
            marginVertical: 150,
            marginHorizontal: 20,
            color: theme['color-primary-500'],
        },
        loadingContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })

    const [weather, setWeather] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const api = {
        link: "https://api.openweathermap.org/data/2.5/weather?",
        key: "5eadd4755631169fa5a9ca425ce2f238"
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    async function fetchWeather() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }
            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords

            const URL = `${api.link}lat=${latitude}&lon=${longitude}&lang=pl&units=metric&appid=${api.key}`

            const weatherFetch = await fetch(URL)
            const result = await weatherFetch.json()
            if (weatherFetch.ok) {
                setWeather(result)
            } else {
                setErrorMsg(result.message)
            }

        } catch (e) {
            setErrorMsg('Dostęp do lokalizacji jest potrzebny do prawidłowego działania aplikacji')
        }
    }

    const checkClouds = (w) => {
        if ((w.weather[0].main).toLowerCase() == 'clouds') {
            if (w.clouds.all > 80) {
                return dictionary[(w.weather[0].main).toLowerCase()]
            }
            return dictionary['fewClouds']
        }
        return false
    }

    const convertUTC = (utc) => {
        const date = new Date(utc * 1000)
        return date.toLocaleTimeString()
    }

    const dictionary = {}
    dictionary['clear'] = <Image source={require('../assets/weatherIcons/png/clear.png')} style={{ width: 190, height: 190 }} />
    dictionary['clouds'] = <Image source={require('../assets/weatherIcons/png/clouds.png')} style={{ width: 190, height: 190 }} />
    dictionary['drizzle'] = <Image source={require('../assets/weatherIcons/png/drizzle.png')} style={{ width: 190, height: 190 }} />
    dictionary['rain'] = <Image source={require('../assets/weatherIcons/png/rain.png')} style={{ width: 190, height: 190 }} />
    dictionary['thunderstorm'] = <Image source={require('../assets/weatherIcons/png/thunderstorm.png')} style={{ width: 190, height: 190 }} />
    dictionary['snow'] = <Image source={require('../assets/weatherIcons/png/snow.png')} style={{ width: 190, height: 190 }} />
    dictionary['mist'] = <Image source={require('../assets/weatherIcons/png/mist.png')} style={{ width: 190, height: 190 }} />
    dictionary['fewClouds'] = <Image source={require('../assets/weatherIcons/png/fewClouds.png')} style={{ width: 190, height: 190 }} />

    if (weather) {
        const { main: { temp, pressure } } = weather
        const { name } = weather
        const sunriseTime = convertUTC(weather.sys.sunrise)
        const sunsetTime = convertUTC(weather.sys.sunset)

        return (
            <Layout style={style.container}>
                <View style={style.weatherContainer}>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={style.icon}>
                            {
                                checkClouds(weather) ? checkClouds(weather) : dictionary[(weather.weather[0].main).toLowerCase()]
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={style.temperature}>
                                <FontAwesomeIcon size={21} style={{ color: theme['color-primary-500'], marginBottom: 10 }} icon={faTemperatureEmpty} />
                                <Text category='h1' style={style.text}> {Math.round(temp)}°C</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 }}>
                                <FontAwesomeIcon size={19} style={{ color: theme['color-primary-500'] }} icon={faGaugeHigh} />
                                <Text category='h5' style={style.textPressure}> {pressure} hPa</Text>
                            </View>
                        </View>
                    </View>
                    <View style={style.location}>
                        <FontAwesomeIcon style={{ color: theme['color-primary-500'] }} icon={faLocationDot} />
                        <Text category='h4' style={style.text}> {name}</Text>
                    </View>
                </View>
                <View style={style.weatherDescription}>
                    <Text category='h5' style={style.text} >{weather.weather[0].description}</Text>
                </View>
                <View style={style.dayContainer}>
                    <View style={style.sunrise}>
                        <Image source={require('../assets/weatherIcons/png/sunrise.png')} style={{ width: 128, height: 128 }} />
                        <Text category='p1' style={style.text}>Wschód słońca</Text>
                        <Text category='h6' style={style.text}>{sunriseTime}</Text>
                    </View>
                    <View style={style.sunset}>
                        <Image source={require('../assets/weatherIcons/png/sunset.png')} style={{ width: 128, height: 128 }} />
                        <Text category='p1' style={style.text}>Zachód słońca</Text>
                        <Text category='h6' style={style.text}>{sunsetTime}</Text>
                    </View>
                </View>
            </Layout>
        )
    } else {
        return (
            <Layout style={style.errorContainer}>
                <Text category='h5' style={style.error}>{errorMsg}</Text>
            </Layout>
        )
    }

}

//#F78E2D