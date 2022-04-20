import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Divider } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { ListIcon, AddIcon } from '../../assets/icons'
import { BTTestA } from '../../screens/BTTestA'
import { BTTestB } from '../../screens/BTTestB'
import { NotesScreen } from '../../screens/Notes/NotesScreen'
import { CreateNoteScreen } from '../../screens/Notes/CreateNoteScreen'

const { Navigator, Screen } = createBottomTabNavigator()

function BottomBar({ navigation, state }) {
    return (
        <View>
            <Divider />
            <BottomNavigation
                appearance='noIndicator'
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab title='Lista notatek' icon={ListIcon} />
                <BottomNavigationTab title='Dodaj notatkę' icon={AddIcon} />
            </BottomNavigation>
        </View>
    )
}

export function BottomTabsNav() {
    return (
        <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomBar {...props} />}>
            <Screen name='List' component={NotesScreen} />
            <Screen name='Create' component={CreateNoteScreen} />
        </Navigator>
    )
}