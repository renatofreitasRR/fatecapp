import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../Screens/SignIn';
import { AppRoutes } from './app.routes';
import { Login } from '../Screens/Login';
import { Splash } from '../Screens/Splash';


function AppProvider() {
    return (
        <AppRoutes />
    );
}


export function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName='InitialPage'
        >
            <Screen
                name='InitialPage'
                component={SignIn}
            ></Screen>
            <Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Voltar'
                }}
                name='Login'
                component={Login}
            ></Screen>
            <Screen
                name='HomeApp'
                component={AppProvider}
            ></Screen>
        </Navigator>
    );
}

