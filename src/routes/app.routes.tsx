import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Dashboard } from '../Screens/Dashboard';
import theme from '../Global/styles/theme';
import { Home } from '../Screens/Home';
import { Patients } from '../Screens/Patients';
import { NestedRegisterPatients } from '../Screens/CreateUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NestedPatient } from '../Screens/Patient';
import { NestedEditPatients } from '../Screens/EditUser';
import { NestedEditRelatory } from '../Screens/EditRelatory';
import { NestedCreateRelatory } from '../Screens/CreateRelatory';
import { NestedRelatory } from '../Screens/Relatory';

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashBoard = () => {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="HomeDashboard"
                component={Dashboard}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                options={{
                    title: 'Atendimentos',
                }}
                name="NestedCreateRelatory"
                component={NestedCreateRelatory}
            />
              <Stack.Screen
                options={{
                    title: 'Atendimentos',
                }}
                name="NestedEditRelatory"
                component={NestedEditRelatory}
            />
            <Stack.Screen
                options={{
                    title: 'Atendimentos',
                }}
                name="NestedRelatory"
                component={NestedRelatory}
            />
        </Stack.Navigator>
    );
}

const HomePatients = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Patients"
                component={Patients}
            />
            <Stack.Screen
                options={{
                    title: 'Pacientes',
                }}
                name="NestedRegisterPatients"
                component={NestedRegisterPatients}
            />
            <Stack.Screen
                options={{
                    title: 'Pacientes'
                }}
                name="NestedEditPatients"
                component={NestedEditPatients}
            />
            <Stack.Screen
                options={{
                    title: 'Voltar'
                }}
                name="NestedViewRelatoryByPatient"
                component={NestedRelatory}
            />
            <Stack.Screen
                options={{
                    title: 'Pacientes'
                }}
                name="NestedPatient"
                component={NestedPatient}
            />
        </Stack.Navigator>
    );
}

const HomeApp = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="HomeApp"
                component={Home}
            />
            <Stack.Screen
                options={{
                    title: 'In??cio'
                }}
                name="NestedHomePatient"
                component={NestedPatient}
            />
             <Stack.Screen
                options={{
                    title: 'Voltar'
                }}
                name="NestedHomeRelatoryByPatient"
                component={NestedRelatory}
            />
             <Stack.Screen
                options={{
                    title: 'Voltar'
                }}
                name="NestedViewRelatoryByPatient"
                component={NestedRelatory}
            />
        </Stack.Navigator>
    );
}

export function AppRoutes() {

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 80,

                }
            }}

            initialRouteName='In??cio'
        >
            <Screen
                name="In??cio"
                component={HomeApp}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <FontAwesome5
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Atendimentos"
                component={DashBoard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <Ionicons
                            name="document"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Pacientes"
                component={HomePatients}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <FontAwesome5
                            name="user-injured"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
              {/* <Screen
                name="Controle"
                component={HomePatients}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <FontAwesome5
                            name="user-cog"
                            size={size}
                            color={color}
                        />
                    )
                }}
            /> */}
        </Navigator>
    );
}