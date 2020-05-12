import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { User } from '../constants';

const {height, width} = Dimensions.get('window')

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'List'
    }

    state = {
        users: [],
        dbRef: firebase.database().ref('users')
    }

    componentDidMount (){
        this.state.dbRef.on('child_added', (val) => {
            let account = val.val();
            account.phonenumber = val.key;
            if (account.phonenumber === User.phonenumber ) {
                User.username = account.username
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, account]
                    }
                })
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.state.dbRef.off()
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={{padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1}}
                onPress={() => this.props.navigation.navigate('PrivateChat', item)}
            >
                <Text 
                    style={{fontSize: 20}}
                >
                    {item.username}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <FlatList 
                    style={{height}}
                    data={this.state.users}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.phonenumber}
                    ListHeaderComponent={() => <Text style={{fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: 'bold'}}>Chats</Text>}
                />
            </View>            
        );
    }
};

const styles = StyleSheet.create({
    container: {}
});