import { Text, View, StyleSheet } from 'react-native';

export function HomeScreen() {
    return (
        <View style={styles.viewContainer}>
            <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});