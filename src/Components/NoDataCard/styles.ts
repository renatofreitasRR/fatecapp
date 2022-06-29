import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Card = styled.View`
    width: 100%;
    border-radius: ${RFValue(8)}px;
    padding: ${RFValue(16)}px;

    background-color: ${({ theme }) => theme.colors.shape};

`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(90)}px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;

    color:  ${({ theme }) => theme.colors.title};
`;

