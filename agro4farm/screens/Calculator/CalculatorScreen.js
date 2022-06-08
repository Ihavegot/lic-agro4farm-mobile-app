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
        setOutput('Wynik: ' + wynik + 'kg/ha')
    }

    const checkAndCalculate = () => {
        !mtz || !obsada || !sk ? setOutput('Podaj wszystkie dane') : calculate()
    }

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
