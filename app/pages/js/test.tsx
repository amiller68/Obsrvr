import React from 'react';
import * as server from '../../server_comm'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function test() {
    return(
        <View style={styles.container}>
            <Text>TESTETESTTESTSETTEST</Text>
            <TouchableOpacity
                onPress={
                    () => {
                        console.log("testarooni");
                        server.test_request();
                    }
                }
            >
                <Text>
                    TESTBUTTON
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
