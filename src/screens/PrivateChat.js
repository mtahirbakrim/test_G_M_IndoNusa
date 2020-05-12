import React, {Component} from 'react';
import { View, KeyboardAvoidingView, Text, Animated, Image, StyleSheet, Keyboard, Platform, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { User, Images } from '../constants';
import firebase from 'react-native-firebase';
import { FlatList } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window')
const isAndroid = Platform.OS === 'android';

export default class PrivateChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('username', null)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: {
                username: props.navigation.getParam('username'),
                phonenumber: props.navigation.getParam('phonenumber'),
            },
            textMessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages')
        }
        this.keyboardHeight = new Animated.Value(0);
        this.keyboardHeight = new Animated.Value(60);
    }

    componentDidMount() {
        this.keyboardShowListener = Keyboard.addListener(isAndroid ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true));
        this.keyboardHideListener = Keyboard.addListener(isAndroid ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e, false));
        this.state.dbRef.child(User.phonenumber).child(this.state.account.phonenumber)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    componentWillUnmount() {
        this.state.dbRef.off();
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    keyboardEvent = (event, isShow) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 60
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: 60
            })
        ]).start();
    }

    handleChange = key => val => {
        this.setState({ [key]: val})
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if(c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
         }
        return result;
    }

    sendMessage = async () => {
        if(this.state.textMessage.length > 0) {
            let msgId = this.state.dbRef.child(User.phonenumber).child(this.state.account.phonenumber).push().key
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phonenumber
            }
            updates[User.phonenumber + '/' + this.state.account.phonenumber + '/' + msgId] = message;
            updates[this.state.account.phonenumber + '/' + User.phonenumber + '/' + msgId] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' })
        }
    }

    _renderItem = ({item}) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    maxWidth: '60%',
                    alignSelf: item.from===User.phonenumber ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from===User.phonenumber ? '#00897b' : '#7cb342',
                    borderRadius: 5,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{color: '#fff', padding: 7, fontSize: 16}}
                >
                    {item.message}
                </Text>
                <Text
                    style={{color: '#eee', padding: 3, fontSize: 12}}
                >
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
                <Animated.View style={[styles.bottomBar, {bottom: this.keyboardHeight}]}>
                    <TextInput 
                        style={styles.inputMessage}
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                        placeholder="Type message..."
                    />
                    <TouchableOpacity
                        style={styles.sendButtonContainer}
                        onPress={this.sendMessage}
                    >
                        <Image 
                            source={Images.IconSendMessage} style={{tintColor: 'white', resizeMode: 'contain', height: 20}}
                        />
                    </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated:true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})} 
                    style={{padding: 10, height, paddingHorizontal: 5}}
                    data={this.state.messageList}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{height: this.bottomPadding}} />}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    inputMessage: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '85%',
        marginBottom: 10,
        borderRadius: 20
    },
    sendText: {
        color: 'darkblue',
        fontSize: 20
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: 'white',
        height: 60
    },
    sendButtonContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: 'darkblue',
        borderRadius: 20
    }
});