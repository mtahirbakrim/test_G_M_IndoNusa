import React, {Component} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
//import { TextInput } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { User } from '../constants';

export default class LogInScreen extends React.Component {
    state = {
        phonenumber: '',
        username: ''
    }

    UNSAFE_componentWillMount(){
        AsyncStorage.getItem('phonenumberasync').then(val=>{
            if(val){
                this.setState({phonenumber:val})
            }
        })
    }

    _handlechange = key => val => {
        this.setState({ [key]: val})
    }

    _submitSignUp = async () => {
        if(this.state.phonenumber.length < 3){
            Alert.alert('Error','Wrong Phone Number')
        } else if(this.state.username.length < 3){
            Alert.alert('Error','Wrong User Name')
        }else{
            await AsyncStorage.setItem('phonenumberasync',this.state.phonenumber)
            User.phonenumber = this.state.phonenumber;
            firebase.database().ref('users/' + User.phonenumber).set({username: this.state.username})
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Phone Number"
                    style={styles.input}
                    value={this.state.phonenumber}
                    onChangeText={this._handlechange('phonenumber')}
                />
                <TextInput 
                    placeholder="User Name"
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={this._handlechange('username')}
                />
                <View>
                    <TouchableOpacity
                        onPress={this._submitSignUp}
                    >
                        <Text
                            style={styles.signUpText}
                        >
                            LogIn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        );
    }
};

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
    signUpText: {
        color: 'darkblue',
        fontSize: 20
    }
});