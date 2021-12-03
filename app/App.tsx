import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as pages from './pages/pages'
import * as server from "./server_comm";

// export class App extends React.Component {
//   render() {
//       return (
//           console.log("hmmm");
//           pages.test()
//       );
//   }
// }

export function test() {
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

export default function App() {
    console.log("hmm")
    return (
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
