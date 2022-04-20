import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Divider } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { HomeIcon, VideoIcon } from '../../assets/icons'
import { BTTestA } from '../../screens/BTTestA'
import { BTTestB } from '../../screens/BTTestB'

const { Navigator, Screen } = createBottomTabNavigator()

function BottomBar({ navigation, state }) {
    return (
        <View>
            <Divider />
            <BottomNavigation
                appearance='noIndicator'
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab title='A' icon={HomeIcon} />
                <BottomNavigationTab title='B' icon={VideoIcon} />
            </BottomNavigation>
        </View>
    )
}

export function BottomTabsNav() {
    return (
        <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomBar {...props} />}>
            <Screen name='A' component={BTTestA} />
            <Screen name='B' component={BTTestB} />
        </Navigator>
    )
}