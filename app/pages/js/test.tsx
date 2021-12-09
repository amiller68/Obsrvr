import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function test(updateRouterData: (item_name: string, item_value: any) => void) {
    return (
        <View>
            <Text>Welcome!</Text>
            <CheckBox
                onPress={() => updateRouterData('test', true)}>
            </CheckBox>
        </View>
    )
}
