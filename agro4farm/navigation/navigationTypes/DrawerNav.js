import { createDrawerNavigator } from "@react-navigation/drawer"
import { Avatar, Drawer, DrawerItem, IndexPath, Layout, Text, useTheme } from '@ui-kitten/components'
import { StyleSheet, View } from "react-native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DBIcon, HomeIcon, InfoIcon, KalcIcon, NotesIcon, SunIcon, WorkIcon } from '../../assets/icons'
import { AboutScreen } from "../../screens/AboutScreen"
import { CalculatorScreen } from "../../screens/CalculatorScreen"
import { TestScreen } from '../../screens/TestScreen'
import { WeatherLocationScreen } from '../../screens/WeatherLocationScreen'
import { BottomTabsNav } from './BottomTabsNav'


const { Navigator, Screen } = createDrawerNavigator()

function DrawerContent({ navigation, state }) {
    const Header = () => (
        <Layout style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Avatar
                    size='large'
                    source={require('../../assets/icon.png')}
                />
                <Text
                    style={styles.appName}
                    category="h4"
                >
                    Agro4Farm
                </Text>
            </View>
        </Layout>
    )
    return (
        <SafeAreaProvider>
            <Drawer
                selectedIndex={new IndexPath(state.index)}
                header={Header}
                onSelect={index => navigation.navigate(state.routeNames[index.row])}
            >
                <DrawerItem title='Strona główna' accessoryLeft={HomeIcon} />
                <DrawerItem title='Pogoda' accessoryLeft={SunIcon} />
                <DrawerItem title='Kalkulator wysiewu' accessoryLeft={KalcIcon} />
                <DrawerItem title='Środki ochrony roślin' accessoryLeft={DBIcon} />
                <DrawerItem title='Notatki' accessoryLeft={NotesIcon} />
                <DrawerItem title='Przewidywanie terminów pracy' accessoryLeft={WorkIcon} />
                <DrawerItem title='O aplikacji' accessoryLeft={InfoIcon} />
            </Drawer>
        </SafeAreaProvider>
    )
}

export function DrawerNav() {
    const theme = useTheme()
    return (
        <Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Screen name="MainScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={WeatherLocationScreen} />
            <Screen name="WeatherScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={WeatherLocationScreen} />
            <Screen name="CalcScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={CalculatorScreen} />
            <Screen name="FetrScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={TestScreen} />
            <Screen name="NotesScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={BottomTabsNav} />
            <Screen name="WorecastScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={TestScreen} />
            <Screen name="AboutScreen" options={{ title: '', headerStyle: { backgroundColor: theme['background-basic-color-2']} }} component={AboutScreen} />
        </Navigator>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        paddingBottom: 50,
    },
    appName: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
})