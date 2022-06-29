import React, { useEffect, useRef } from "react";
import { Skeleton } from "..";
import { View } from 'react-native';

export function RelatoryCardSkeleton() {

    return (
        <View style={{
            marginBottom: 32
        }}>
            <Skeleton height={200} width={'100%'} />
        </View>
    );
};
