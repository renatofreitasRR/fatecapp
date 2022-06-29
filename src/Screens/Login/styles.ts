import styled from 'styled-components/native';
import { RFValue, RFPercentage }  from 'react-native-responsive-fontsize';

export const LoginContainer = styled.View`
    flex: 1;
    padding: 0 ${RFValue(16)}px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
`;

export const LoginText = styled.Text`
    color: ${({theme}) => theme.colors.primary};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(30)}px;

`;

export const Form = styled.View`
    width: 100%;
`;




  
