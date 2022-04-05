import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [city, setCity] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            let regionName = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            setCity(regionName)

        })();
    }, []);

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{JSON.stringify(city)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});