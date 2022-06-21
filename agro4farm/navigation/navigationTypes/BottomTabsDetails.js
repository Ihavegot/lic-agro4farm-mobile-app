import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DetailsBrowserScreen } from '../../screens/DetailsBrowserScreen'
import { TestScreen } from '../../screens/TestScreen'

const { Navigator, Screen } = createBottomTabNavigator()

function BottomTabsDetailsBar({ navigation, state }) {
    return (
        <></>
    )
}

export function BottomTabsDetails() {
    return (
        <Navigator screenOptions={{ headerShown: false, tarBarStyle: { display: 'none' } }} tabBar={props => <BottomTabsDetailsBar {...props} />} >
            <Screen name='Browser' component={TestScreen} />
            <Screen name='BrowserDetails' component={DetailsBrowserScreen} />
        </Navigator>
    )
}