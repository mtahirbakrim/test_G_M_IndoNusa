import React, {Component} from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import AppNavigator from './src/navigations/AppNavigator';

export default class App extends Component {
    render() {
        return (
            <>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});