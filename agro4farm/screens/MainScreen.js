import { Layout, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Image } from 'react-native'

export function MainScreen(){
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
            padding: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text:{
            color: theme['color-primary-400'],
            textAlign: 'center',
            paddingVertical: 25,
        },
    })
    return (
        <Layout style={styles.layout}>
            <Text category='h1' style={styles.text}>
                Witaj w Agro4Farm
            </Text>
            <Image source={require('../assets/logo.png')} style={{ width: 180, height: 180 }} />
            <Text category='h5' style={styles.text}>
                Aplikacja ta stworzona jest dla rolników w celu organizacji części ich pracy
            </Text>
        </Layout>
    )
}