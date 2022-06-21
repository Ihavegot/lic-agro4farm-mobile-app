import { Button, Layout, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { Alert, Linking, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

export function DetailsBrowserScreen({ route }) {
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 35,
        },
        bold: {
            color: theme['color-primary-500'],
            fontWeight: 'bold',
            fontSize: 18,
        },
        normal:{
            color: theme['color-primary-500'],
            fontSize: 16,
        },
        text:{
            marginVertical: 4,
        },
        detailsContainer: {
            flex: 4,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 25,
            marginTop: 5,
            marginBottom: 25,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        buttonsGroup:{
            flex: 1,

        },
        btn:{
            paddingVertical: 10,
            marginVertical: 10
        }
    })
    const { singleAgrofag } = route.params
    const getCurrentDate = () => {
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        return day + "/" + month + "/" + year
    }

    const saveNote = async () => {
        const value = await AsyncStorageLib.getItem("NOTES")
        const n = value ? JSON.parse(value) : []
        n.push({ title: `Kupno ${singleAgrofag.nazwa}`, note: `Zakupiono ${singleAgrofag.nazwa}, dnia ${getCurrentDate()}`})
        await AsyncStorageLib.setItem("NOTES", JSON.stringify(n)).then(() => {
            Alert.alert(
                "Dodano do notatek",
                `Kupno ${singleAgrofag.nazwa}`,
                [
                    {
                        text: "Ok",
                    }
                ]
            )
        })
    }

    return (
        <Layout style={styles.layout}>
            <View style={styles.detailsContainer}>
                <ScrollView>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Nazwa środku: </Text>
                        <Text style={styles.normal}>{singleAgrofag.nazwa}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Numer zezwolenia: </Text>
                        <Text style={styles.normal}>{singleAgrofag.nrzezw}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Termin zezwolenia: </Text>
                        <Text style={styles.normal}>{singleAgrofag.terminzezw}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Termin do sprzedaży: </Text>
                        <Text style={styles.normal}>{singleAgrofag.termindosprzedazy}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Rodzaj środku: </Text>
                        <Text style={styles.normal}>{singleAgrofag.rodzaj}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Substancja czynna: </Text>
                        <Text style={styles.normal}> {singleAgrofag.substancja_czynna}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Uprawa: </Text>
                        <Text style={styles.normal}>{singleAgrofag.uprawa}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Agrofag: </Text>
                        <Text style={styles.normal}>{singleAgrofag.agrofag}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Dawka: </Text>
                        <Text style={styles.normal}>{singleAgrofag.dawka}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Termin stosowania: </Text>
                        <Text style={styles.normal}>{singleAgrofag.termin}</Text>
                    </Text>
                </ScrollView>
            </View>
            <View style={styles.buttonsGroup}>
                <Button style={styles.btn} onPress={() => {
                    Linking.openURL(`https://www.google.com/search?q=${singleAgrofag.nazwa}`)
                }}>
                    <Text>Wyszukaj i kup</Text>
                </Button>
                <Button style={styles.btn} onPress={saveNote}>
                    <Text>Zapisz informację o kupnie</Text>
                </Button>
            </View>
        </Layout>
    )
}