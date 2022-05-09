import { Layout, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

export function AboutScreen(){
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 35,
        },
        text:{
            color: theme['color-primary-500'],
        },
    })
    return (
        <Layout style={styles.layout}>
            <Text style={styles.text} category='h4'>Agro4Farm to aplikacjia stworzona, aby ułatwić prace rolników. W skłąd jej funkcjonalności wchodzą między innymi: </Text>
            <Text></Text>
            <Text style={styles.text} category='h5'>➊ Aktualna prognoza pogody</Text>
            <Text style={styles.text} category='h5'>➋ Kalkulator wysiewu zbóż</Text>
            <Text style={styles.text} category='h5'>➌ Notatnik</Text>
            <Text style={styles.text} category='h5'>➍ Wyszukiwarka środków ochrony roślin</Text>
            <Text style={styles.text} category='h5'>➎ Określanie najkorzystniejszych terminów do pracy/nawożenia</Text>
        </Layout>
    )
}