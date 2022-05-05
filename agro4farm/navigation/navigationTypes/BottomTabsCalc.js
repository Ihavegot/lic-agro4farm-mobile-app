import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Divider, useTheme } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { InfoIcon, KalcIcon } from '../../assets/icons'
import { CalculatorScreen } from '../../screens/Calculator/CalculatorScreen'
import { InfoScreen } from '../../screens/Calculator/InfoScreen'

const { Navigator, Screen } = createBottomTabNavigator()

function BottomBar({ navigation, state }) {
    const theme = useTheme()
    return (
        <View>
            <Divider />
            <BottomNavigation
                style={{ backgroundColor: theme['background-basic-color-2'] }}
                appearance='noIndicator'
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab title='Kalkulator' icon={KalcIcon} />
                <BottomNavigationTab title='Info' icon={InfoIcon} />
            </BottomNavigation>
        </View>
    )
}

export function BottomTabsCalc() {
    return (
        <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomBar {...props} />}>
            <Screen name='Calc' component={CalculatorScreen} />
            <Screen name='Info' component={InfoScreen} />
        </Navigator>
    )
}