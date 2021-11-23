import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// A domain name we get through localtunnel
// @ts-ignore
//export const server_address = Constants.manifest.extra.serverUri;
export const server_address = "https://obsrvr.loca.lt/"

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
