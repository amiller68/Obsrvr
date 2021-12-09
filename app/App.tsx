import React, { Component, useState } from 'react';
import {server_request, init_server_request} from "./server_comm";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PageRouter from './pages/pages';
import { Camera } from 'expo-camera';
import pages from "./pages/pages";


type AppProps = any;
type AppState = {
    page: string,
    button_string: string,
}

class App extends Component<AppProps, AppState> {
    private camera: Camera | null;
    constructor(props: {}) {
        super(props);
        //Initially set to the init page
        this.state = {
            page: 'init',
            button_string: 'Let\'s begin'
        }
        this.camera = null;
        this.onSubmit = this.onSubmit.bind(this);
        this.snap = this.snap.bind(this)
    }

    async onSubmit(page_name: string, data: any) {
        let new_page = await server_request(page_name, data);

        let new_state = {
            'page': new_page,
            'button_string': 'Ok'
        } as AppState

        this.setState(new_state)
    }

    async snap() {
        if (this.camera) {
            await this.camera._onCameraReady();
            this.camera.takePictureAsync()
                .then((photo) =>
                    init_server_request(photo))
                .then((next_page) => {
                    let new_state = {
                        'page': next_page,
                        'button_string': 'Ok'
                    } as AppState

                    this.setState(new_state)
                });
        }
    };

    render() {
        if (this.state.page === 'init') {
            return (
                <View style={styles.container}>
                    <Camera
                        style={{backgroundColor: "#fff"}}
                        ref={(ref) => this.camera = ref}/>
                    <Text> Hi There!</Text>
                    <TouchableOpacity onPress={this.snap}>
                        <Text>
                            Let's begin.
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
              <View style={styles.container}>
                  <PageRouter
                      page_name={this.state.page}
                      button_string={this.state.button_string}
                      onPageSubmit={this.onSubmit}
                  />
              </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;

