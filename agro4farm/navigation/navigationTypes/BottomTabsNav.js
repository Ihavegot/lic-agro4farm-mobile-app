import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Divider, useTheme } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { ListIcon, AddIcon } from '../../assets/icons'
import { NotesScreen } from '../../screens/Notes/NotesScreen'
import { CreateNoteScreen } from '../../screens/Notes/CreateNoteScreen'
import { DetailsNoteScreen } from '../../screens/Notes/DetailsNoteScreen'

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
            <Screen name='Detail' component={DetailsNoteScreen} />
        </Navigator>
    )
}