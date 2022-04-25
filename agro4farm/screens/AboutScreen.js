import { Divider, Layout, StyleService, Text } from '@ui-kitten/components';
import React from 'react';
import { Platform, StatusBar } from 'react-native';

export const AboutScreen = () => {
    return (
        <Layout style={styles.layout}>
            <Text category='h1'>Aplikacjia Agro4Farm to aplikacjia stworzona, aby ułatwić prace rolników.</Text>
        </Layout>
    )
}

const styles = StyleService.create({
    layout: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
    }
});