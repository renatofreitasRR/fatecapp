import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';


export const Container = styled(TouchableOpacity)`
    width: ${RFValue(70)}px;
    height: ${RFValue(70)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text_dark};
    border-radius: 100px;

    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 5%;
    align-self: center;
`;

