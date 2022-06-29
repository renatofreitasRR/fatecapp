import React, { useEffect, useRef } from "react";
import { Skeleton } from "..";
import { View } from 'react-native';

export function PatientCardSkeleton() {

    return (
        <View style={{
            marginBottom: 32
        }}>
            <Skeleton height={100} width={'100%'} />
        </View>
    );
};
