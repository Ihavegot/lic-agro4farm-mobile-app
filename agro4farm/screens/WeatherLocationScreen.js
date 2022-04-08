import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'

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
            const URL = `${api.link}lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`

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

    if (weather) {
        const { main: { temp } } = weather
        return (
            <View style={style.container}>
                <Text>
                    {Math.round(temp)}
                </Text>
            </View>
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

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    }
})