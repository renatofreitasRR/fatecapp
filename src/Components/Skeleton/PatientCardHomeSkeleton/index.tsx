import React from "react";
import { Skeleton } from "..";
import { View } from 'react-native';

export function PatientCardHomeSkeleton() {

    return (
        <View style={{
            marginRight: 16
        }}>
            <Skeleton height={137} width={200} />
        </View>
    );
};
