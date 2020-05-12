import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import PrivateChatScreen from '../screens/PrivateChat';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Images } from '../constants';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        PrivateChat: PrivateChatScreen
    }
);

HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = navigation.state.index === 0;;

    return {
        tabBarVisible
    };
};

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen
    }
);

ProfileStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = navigation.state.index === 0;;

    return {
        tabBarVisible
    };
};

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Profile: ProfileStack
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let imageName = Images.IconTabList;
                if (routeName === 'Profile') {
                    imageName = Images.IconTabProfile;
                }

                return <Image source={imageName} style={{width: 25, resizeMode: 'contain', tintColor}}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'darkblue',
            iinactiveTintColor: 'gray',
        },
    }
)

const AuthStack = createStackNavigator(    
    {
        LogIn: LogInScreen,
        SignUp: SignUpScreen 
    }
);

const AuthLoading = createStackNavigator(
    {
        AuthLoading: AuthLoadingScreen
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: TabNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
))
