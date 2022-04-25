import { Button, Divider, Input, Layout, StyleService, Text } from '@ui-kitten/components';
import React from 'react';

export const CalculatorScreen = () => {
    return (
        <Layout style={styles.layout}>

            <Input placeholder='Obsada' keyboardType='numeric'></Input>
            <Input placeholder='MZT' keyboardType='numeric'></Input>
            <Input placeholder='Siła kiełkowania' keyboardType='numeric'></Input>
            <Button>Oblicz</Button>
            <Text>
            (MTZ x obsada) / siła kiełkowania = ilość wysiewu w kg/ha
            </Text>
            <Text>
                MTZ - Masa Tysiąca Ziaren (g)
            </Text>
            <Text>
                Obsada - liczba roślin na jednostce powierzchni (szt./m2)
            </Text>
            <Text>
                Siła kiełkowania - określona dla nasion kwalifikowanych MINIMUM (dla pszenżyta 80%).
            </Text>

        </Layout>
    );
};

const styles = StyleService.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});