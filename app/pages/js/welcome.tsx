import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function welcome(updateRouterData: (item_name: string, item_value: any) => void) {
    return (
        <View>
            <Text>Welcome!</Text>
            <TextInput
                onChangeText={(value) => {
                    updateRouterData('name', value)}
                }
                placeholder={'What\'s your name?'}
            />
        </View>
    )
}
