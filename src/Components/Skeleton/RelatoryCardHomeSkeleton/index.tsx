import React from "react";
import { Skeleton } from "..";
import { View } from 'react-native';

export function RelatoryCardHomeSkeleton() {

    return (
        <View style={{
            marginRight: 16
        }}>
            <Skeleton height={150} width={200} />
        </View>
    );
};
