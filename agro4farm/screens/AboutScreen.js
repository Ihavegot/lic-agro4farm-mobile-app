import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

export const AboutScreen = () => {
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 25,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    return (
        <Layout style={styles.layout}>
            <Text category='h4'>Aplikacjia Agro4Farm to aplikacjia stworzona, aby ułatwić prace rolników.</Text>
        </Layout>
    )
}