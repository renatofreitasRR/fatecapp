import styled from 'styled-components/native';
import { RFPercentage, RFValue }  from 'react-native-responsive-fontsize';

export const BackgroundPrimary = styled.View`
    width: 100%;
    height: ${RFPercentage(70)}px;
    background-color: ${({theme}) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackgroundSecondary = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    flex: 1;
    position: relative;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LogoText = styled.Text`
    padding-top: 8px;
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const Phrase = styled.Text`
    margin-top: 48px;
    padding: 18px;
    text-align: center;
    font-size: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.medium};
`;

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.shape};
    position: absolute;
    top: -25px;
    width: 100%;
    height: ${RFValue(50)}px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
`;

export const ButtonLogin = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.shape};
    position: absolute;
    width: 100%;
    top: 50px;
    height: ${RFValue(50)}px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    position: absolute;
    top: -25px;
`;

export const ButtonText = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.primary};
    font-family: ${({theme}) => theme.fonts.bold};
    margin-left: ${RFValue(48)}px;
`;



  
