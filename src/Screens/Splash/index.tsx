import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Logo....
import Logo from '../../assets/images/logoPng.png';
import LogoSVG from '../../assets/images/logo.svg';
import LOGOPNG from '../../assets/images/logoPng.png';
import { useAuth } from '../../hooks/auth';
import { Routes } from '../../routes';
import { AppRoutes } from '../../routes/app.routes';
import { AuthRoutes } from '../../routes/auth.routes';
import { Home } from '../Home';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import theme from '../../Global/styles/theme';

const BGColor = "#CEE570"

export function Splash() {
    const { userGoogle, user } = useAuth();
    console.log("SPLASH USER", user);
    console.log("SPLASH USERGOOGLE", userGoogle);

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {

        // Starting Animation after 500ms....
        setTimeout(() => {
            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (0 + -50),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
                            y: (Dimensions.get('window').height / 2) - 35
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();
        }, 500);
    }, [])

    // Going to Move Up like Nav Bar...
    return (
        <SafeAreaView style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2A1871',
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: '#2A1871',
                zIndex: 1,
                transform: [
                    { translateY: startAnimation }
                ]
            }}>

                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Animated.Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto_500Medium',
                        color: 'white',
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]
                    }}>
                        <Text style={{
                            marginRight: 25
                        }}>
                            Médico da Família
                        </Text>
                    </Animated.Text>

                </Animated.View>

            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.04)',
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
                {userGoogle.id || user.id ? <AppRoutes /> : <AuthRoutes />}
            </Animated.View>
        </SafeAreaView>
    );
}