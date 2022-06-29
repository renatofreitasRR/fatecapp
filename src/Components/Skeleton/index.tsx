import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from "react-native";

const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

import {
    PatientCardSkeleton
} from './styles';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonProps {
    variant?: "box" | "circle";
    width: number | string;
    height: number | string;
}


export function Skeleton({ width, height, variant = "box" }: SkeletonProps) {
    const opacity = useRef(new Animated.Value(0.3));

    let borderRadius = 8;

    if(variant === "circle"){
        borderRadius = typeof height === "string" ? parseInt(height) / 2 : height / 2;
    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                })
            ]))
            .start();

    }, [opacity])

    return (
        <Animated.View style={
            {
                opacity: opacity.current,
                height: height,
                width: width,
                borderRadius: borderRadius,
                backgroundColor: '#aaa',
            }
        }
        >

        </Animated.View>
    );
};
