import React from 'react';
import { ActivityIndicator, StatusBar, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { User, Firebase } from '../constants'

export default class AuthLoadingScreen extends React.Component{
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    UNSAFE_componentWillMount() {
        Firebase
    }

    _bootstrapAsync = async () => {
        User.phonenumber = await AsyncStorage.getItem('phonenumberasync');
        this.props.navigation.navigate(User.name ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar 
                    barStyle="default"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
});