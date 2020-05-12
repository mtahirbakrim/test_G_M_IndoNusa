import React,{Component} from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { User } from '../constants';
import firebase from 'react-native-firebase'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        username: User.username
    }

    _handleChange = key => val => {
        this.setState({[key]:val})
    }

    _onPressLoggedOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    _changeName = async () => {
        if(this.state.username.length<3) {
            Alert.alert('Error', 'Enter Valid Name');
        } else if (User.username !== this.state.name) {
            firebase.database().ref('users').child(User.phonenumber).set({username:this.state.username});
            User.username = this.state.username;
            Alert.alert('Success', 'Name changed successful.');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {User.phonenumber}
                </Text>
                <Text>
                    {User.username}
                </Text>
                <TextInput 
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={this._handleChange('username')}
                />
                <TouchableOpacity
                    onPress={this._changeName}
                >
                    <Text style={styles.btnText}>
                        Change Name
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onPressLoggedOut}
                >
                    <Text style={styles.btnText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
        marginBottom: 10,
        borderRadius: 5
    },
    btnText: {
        color: 'darkblue',
        fontSize: 20
    }
});