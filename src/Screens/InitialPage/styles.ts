import styled from 'styled-components/native';
import { RFValue, RFPercentage }  from 'react-native-responsive-fontsize';

export const InitialPageContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    padding: ${RFValue(16)}px;
`;

export const LoginImage = styled.Image`
    width: ${RFValue(300)}px;
    height: ${RFValue(300)}px;
`;


export const Text = styled.Text`
    color: ${({theme}) => theme.colors.primary};
    margin-top: 16px;
    font-size: ${RFValue(16)}px;
`;

export const AppLogo = styled.View``;

export const InitialPageButtonsContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
`;


  
