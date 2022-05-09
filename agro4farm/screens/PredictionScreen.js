import { Layout, Text, useTheme } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'

export function PredictionScreen() {
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
        },
    })

    const [weather, setWeather] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const api = {
        link: "https://api.openweathermap.org/data/2.5/onecall?",
        key: "5eadd4755631169fa5a9ca425ce2f238"
    }

    useEffect(() => {
        fetch7weather()
    }, [])

    const fetch7weather = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }
            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords
            const part = 'current,minutely,hourly'

            const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=${part}&appid=${api.key}`

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

    console.log(weather)
    if (weather) {
        return (
            <Layout style={styles.layout}>
                <Text>{weather.daily[0].pressure}</Text>
            </Layout>
        )
    }

}