import React, { Component } from 'react';
import {server_request, test_request} from "./server_comm";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PageRouter from './pages/pages';
import pages from "./pages/pages";


type AppProps = any;
type AppState = {
    page: string,
    button_string: string
}

class App extends Component<AppProps, AppState> {
    constructor(props: {}) {
        super(props);

        //Initially set to the init page
        this.state = {
            page: 'init',
            button_string: 'Let\'s begin'
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(page_name: string, data: any) {
        console.log(data)
        let new_state = {
            'page': '',
            'button_string': ''
        } as AppState

        if (page_name == 'init') {
            new_state['page'] = 'welcome';
            new_state['button_string'] = 'Submit Form'
        }

        if (page_name == 'welcome') {
            new_state['page'] = 'init';
            new_state['button_string'] = 'Let\'s Begin'
        }

        this.setState(new_state)
        console.log(this.state)
    }

    render() {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;

