import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


// A domain name we get through localtunnel
export const server_address = "https://weak-bulldog-58.loca.lt/";
// export const server_address = "https://192.168.1.159:3000";

export default function App() {

  async function test_request() {
    try {
      console.log("testing: ", server_address)
      let response = await fetch( server_address);
      console.log("TestID5")
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
  }
  return (
      <View style={styles.container}>
        <Text>TESTETESTTESTSETTEST</Text>
        <TouchableOpacity
            onPress={
              () => {
                console.log("testarooni");
                test_request();
              }
            }
        >
          <Text>
            TESTBUTTON
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
