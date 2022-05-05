import { Button, Divider, Input, Layout, StyleService, Text, useTheme } from '@ui-kitten/components'
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native'
import { faList, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const InfoScreen = () => {
    const theme = useTheme()
    const styles = StyleSheet.create({
        layout: {
            flex: 1,
        },
        info: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 15,
            padding: 5,
            backgroundColor: theme['background-basic-color-2'],
            borderRadius: 20,
        },
        list: {
            marginTop: 20,
            borderRadius: 30,
            minHeight: 60,
            minWidth: 60,
        },
        title: {
            color: theme['color-primary-500'],
        },
    });

    return (
        <Layout style={styles.layout}>
            <View style={styles.info}>
                <Text category='h4' style={styles.title}>MTZ</Text>
                <Text>Masa Tysiąca Ziaren ( g )</Text>
                <Button
                    style={styles.list}
                    onPress={() => {
                        Alert.alert(
                            'Lista MTZ',
                            `Żyto: 25-35 g\n\nPszenżyto ozime: 35-45 g\n\nPszenica ozima: 35-45 g\n\nPszenica jara: 32-44 g\n\nJęczmień ozimy: 35-45 g\n\nJęczmień jary: 32-48 g\n\nOwies: 25-35 g\n\nRzepak: 2,5-3,5 g\n\nKukurydza: 200-400 g\n\nBobik: 350-500 g\n\nGroch siewny: 150-300 g\n\nŁubin żółty: 120-160 g\n\nGryka: 16-24 g\n\nLen: 3-5 g\n\nSezam: 3,3 g\n\nMak: 0,4-0,6 g`,
                            [
                                {
                                    text: 'Ok',
                                }
                            ]
                        )
                    }}
                >
                    <FontAwesomeIcon icon={faList} />
                </Button>
            </View>
            <View style={styles.info}>
                <Text category='h4' style={styles.title}>Obsada</Text>
                <Text>Liczba roślin na jednostce powierzchni ( szt/m2 )</Text>
            </View>
            <View style={styles.info}>
                <Text category='h4' style={styles.title}>Siła kiełkowania</Text>
                <Text>Określona dla nasion kwalifikowanych MINIMUM ( % )</Text>
                <Button
                    style={styles.list}
                    onPress={() => {
                        Alert.alert(
                            "Siła kiełkowania",
                            "Siła kiełkowania to % nasion, które wykiełkowały w danej próbie. Optymalny czas kiełkowania, w zależności od gatunku, wynosi od 10 do 28 dni.",
                            [
                                {
                                    text: 'Ok',
                                }
                            ]
                        )
                    }}
                >
                    <FontAwesomeIcon icon={faCircleInfo} />
                </Button>
                {/* <Text>Siła kiełkowania to % nasion, które wykiełkowały w danej próbie. Optymalny czas kiełkowania, w zależności od gatunku, wynosi od 10 do 28 dni.</Text> */}
            </View>
            {/* <Text category='h4' style={styles.info}>
                (MTZ x obsada) / siła kiełkowania = ilość wysiewu w kg/ha
            </Text>
            <Text style={styles.info}>
                MTZ - Masa Tysiąca Ziaren ( g )
            </Text>
            <Text style={styles.info}>
                Obsada - liczba roślin na jednostce powierzchni ( szt/m2 )
            </Text>
            <Text style={styles.info}>
                Siła kiełkowania - określona dla nasion kwalifikowanych MINIMUM ( % ).
            </Text> */}

        </Layout>
    );
};
