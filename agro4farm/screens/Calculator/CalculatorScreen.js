import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Button, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export function CalculatorScreen(){
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
        },
        inputs: {
            flex: 3,
            padding: 10,
        },
        in: {
            flex: 1,
            backgroundColor: theme['background-basic-color-2'],
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginTop: 15,
            marginHorizontal: 10,
            borderRadius: 20,
            maxHeight: 50,
            color: theme['color-primary-300']
        },
        output: {
            flex: 1,
            marginTop: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        button: {
            marginVertical: 25,
            borderRadius: 30,
            height: 60,
            width: 60,
        },
        btn: {
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    const [output, setOutput] = useState(null)
    const [mtz, setMtz] = useState(null)
    const [obsada, setObsada] = useState(null)
    const [sk, setSk] = useState(null)

    const calculate = () => {
        let wynik = Math.round((mtz * obsada) / sk)
        setOutput(wynik + 'kg/ha')
    }

    const checkAndCalculate = () => {
        !mtz || !obsada || !sk ? setOutput('Podaj wszystkie dane') : calculate()
    }
//Rzepak: 2,5-3,5 g\n\nKukurydza: 200-400 g\n\nBobik: 350-500 g\n\nGroch siewny: 150-300 g\n\nŁubin żółty: 120-160 g\n\nGryka: 16-24 g\n\nLen: 3-5 g\n\nSezam: 3,3 g\n\nMak: 0,4-0,6 g`,
    const options = [
        {
            label: 'Pszenżyto ozime',
            value: 45,
        },
        {
            label: 'Żyto',
            value: 35,
        },
        {
            label: 'Pszenica ozima',
            value: 45,
        },
        {
            label: 'Pszenica jara',
            value: 44,
        },
        {
            label: 'Jęczmień ozimy',
            value: 45,
        },
        {
            label: 'Jęczmień jary',
            value: 48,
        },
        {
            label: 'Owies',
            value: 35,
        },
        {
            label: 'Rzepak',
            value: 3.5,
        },
        {
            label: 'Kukurydza',
            value: 400,
        },
        {
            label: 'Bobik',
            value: 500,
        },
        {
            label: 'Groch siewny',
            value: 300,
        },
        {
            label: 'Łubin żółty',
            value: 160,
        },
        {
            label: 'Gryka',
            value: 24,
        },
        {
            label: 'Len',
            value: 5,
        },
        {
            label: 'Sezam',
            value: 3.3,
        },
        {
            label: 'Mak',
            value: 0.6,
        },
    ]

    return (
        <Layout style={styles.layout}>
            <View style={styles.inputs}>
                <TextInput style={styles.in} value={mtz} onChangeText={setMtz} placeholder='Masa Tysiąca Ziaren  |  sztuka/m2' keyboardType='numeric' />
                <TextInput style={styles.in} value={obsada} onChangeText={setObsada} placeholder='Obsada  |  g' keyboardType='numeric' />
                <TextInput style={styles.in} value={sk} onChangeText={setSk} placeholder='Siła kiełkowania  |  %' keyboardType='numeric' />
                <View style={styles.btn}>
                    <Button style={styles.button} onPress={checkAndCalculate}>
                        <FontAwesomeIcon icon={faCalculator} />
                    </Button>
                </View>
                <View style={styles.output}>
                    <Text category='h1' style={{color: theme['color-primary-500']}}>{output}</Text>
                </View>
            </View>
        </Layout>
    );
};
