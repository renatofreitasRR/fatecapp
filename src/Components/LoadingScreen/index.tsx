import React, { useEffect, useRef } from "react";
import {
   ActivityIndicator
} from "react-native";
import theme from "../../Global/styles/theme";

import {
    Container
} from './styles';


export function LoadingScreen() {
    return (
        <Container>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </Container>
    );
};
