import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';

export function WeatherScreen() {

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
            e => {
                console.dir(e)  // TODO: Show error/info on screen
            }
        ).finally(
            () => setIsLoading(false)
        )

    }, [api.key, input])
    // TODO: Styles and images for weather
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

const styles = StyleSheet.create({
    cityInput: {
        padding: 10,
        width: '50%',
        backgroundColor: 'lightgray',
        borderRadius: 50,
        color: 'orange',
        placeholderTextColor: 'orange'
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