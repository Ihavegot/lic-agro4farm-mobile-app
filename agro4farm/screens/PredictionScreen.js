import { Layout, Text, useTheme } from '@ui-kitten/components'
import { StyleSheet, View, ScrollView } from 'react-native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export function PredictionScreen() {
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
        },
        today: {
            flex: 5,
            backgroundColor: theme['background-basic-color-2'],
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 25,
            marginVertical: 15,
            borderRadius: 25,
        },
        week: {
            flex: 3,
            backgroundColor: theme['background-basic-color-1'],
            justifyContent: 'center',
            alignItems: 'center',
        },
        singleItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['background-basic-color-2'],
            padding: 15,
            marginHorizontal: 15,
            marginVertical: 25,
            borderRadius: 25,
        },
        dayPrediction:{
            margin: 15,
        },
        dayTemp: {
            flexDirection: 'row',
        },
        dayRestInfo:{
            justifyContent: 'center',
            alignItems: 'center',
        },
        dayPop:{
            justifyContent: 'center',
            alignItems: 'center',
        },
        dayTextTemp:{
            margin: 15,
            color: theme['color-primary-500'],
        },
        dayText:{
            color: theme['color-primary-500'],
        },
        dayTextDate:{
            color: theme['color-primary-500'],
            marginVertical: 5,
            fontWeight: 'bold',
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

    const convertUTC = (utc) => {
        let date = new Date(utc * 1000)
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }

    if (weather) {

        // TODO: Przewidywanie, 3 typy outputu GREAT (temperatura, wiart, deszcz 10/10), MEDIUM (temp, wiatr 5/10), BAD (temperatura, wiatr, deszcz 0/10)
        let details = []
        weather.daily.map(day => {
            if (day.pop > 0.2) {
                details.push({
                    dt: day.dt,
                    tempMorn: day.temp.morn,
                    tempEve: day.temp.eve,
                    tempDay: day.temp.day,
                    humidity: day.humidity,
                    wind: day.wind_speed,
                    pop: day.pop, // wypierdoli sie jak snieg pada
                    pv: day.rain,
                })
            } else {
                details.push({
                    dt: day.dt,
                    tempMorn: day.temp.morn,
                    tempEve: day.temp.eve,
                    tempDay: day.temp.day,
                    humidity: day.humidity,
                    wind: day.wind_gust,
                    pop: day.pop,
                })
            }
        })

        const predict = (d) => {
            if (d.pop >= 0.2 || d.tempDay < 4 || d.tempDay > 25 || d.wind > 15) {
                return <FontAwesomeIcon size={52} icon={faThumbsDown} color='red' />
            } else {
                if (d.wind <= 9 && (d.humidity >= 50 && d.humidity <= 75)) {
                    return <FontAwesomeIcon size={52} icon={faThumbsUp} color='lime' />
                }
                return <FontAwesomeIcon size={52} icon={faThumbsUp} color='yellow' />
            }

        }

        return (
            <Layout style={styles.layout}>
                <View style={styles.today}>
                    <View style={styles.dayPrediction}>
                        {predict(details[0])}
                    </View>
                    <View style={styles.dayDate}>
                        <Text style={styles.dayTextDate} category='h3'>{convertUTC(details[0].dt)}</Text>
                    </View>
                    <View style={styles.dayTemp}>
                        <Text style={styles.dayTextTemp} category='h6'>Rano: {Math.round(details[0].tempMorn)} °C</Text>
                        <Text style={styles.dayTextTemp} category='h6'>Wieczór: {Math.round(details[0].tempEve)} °C</Text>
                    </View>
                    <View style={styles.dayRestInfo}>
                        <Text style={styles.dayText} category='h6'>Wilgotność: {details[0].humidity} %</Text>
                        <Text style={styles.dayText} category='h6'>Wiatr: {details[0].wind} m/s</Text>
                        <View style={styles.dayPop}>
                            <Text></Text>
                            <Text style={styles.dayText} category='h6'>Prawdopodobieństwo opadów</Text>
                            <Text style={styles.dayText} category='h5'>{details[0].pop * 100} %</Text>
                        </View>
                    </View>


                </View>
                <View style={styles.week}>
                    <ScrollView horizontal>
                        {details.map((day, key) => {
                            return (
                                <View key={key} style={styles.singleItem}>
                                    {predict(day)}
                                    <Text>Temp: {Math.round(day.tempDay)} °C</Text>
                                    <Text>Wilgotność: {day.humidity} %</Text>
                                    <Text>Wiatr: {day.wind}m/s</Text>
                                    <Text>Prawd. opadów: {day.pop * 100} %</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </Layout>
        )
    } else {
        return (
            <Layout style={styles.layout}>
                <Text>a</Text>
            </Layout>
        )
    }
}