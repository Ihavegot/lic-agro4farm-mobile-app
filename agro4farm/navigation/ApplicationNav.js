import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { DrawerNav } from './navigationTypes/DrawerNav'

const { Navigator, Screen } = createStackNavigator()

export function ApplicationNav() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Drawer' component={DrawerNav} />
            </Navigator>
        </NavigationContainer>
    )
}