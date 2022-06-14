import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(20)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: ${RFValue(50)}px;
    padding-left: ${RFValue(20)}px;
    padding-right: ${RFValue(20)}px;
    position: relative;
`;

export const UserImage = styled.Image`
    width: ${RFValue(120)}px;
    height: ${RFValue(120)}px;
    border-radius: 100px;
    bottom: -${RFValue(60)}px;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.secondary};
`;
export const UserNameContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: ${RFValue(50)}px;
`;

export const Content = styled.View`
    padding: ${RFValue(20)}px
`;

export const FirstName = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(25)}px;
`;
export const UserInfos = styled.View`
    width: 100%;
    height: ${RFPercentage(43)}px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: ${RFValue(16)}px;
    border-radius: 4px;
    position: relative;
    margin-top: 16px;
`;

export const Fields = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

export const UserContent = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-radius: 4px;
    position: relative;
    margin-top: 16px;
`;

export const UserContentPhone = styled.TouchableOpacity`
    width: 60%;
    background-color: ${({ theme }) => theme.colors.shape};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-radius: 4px;
    position: relative;
    margin-top: 16px;
`;

export const OpenEmail = styled.View`
    background-color: ${({ theme }) => theme.colors.success};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    width: ${RFValue(60)}px;
    height:  ${RFValue(20)}px;
    border-radius: 4px;
`;

export const UserEmail = styled.TouchableOpacity`
    width: 100%;
`;

export const UserPhone = styled.TouchableOpacity`
    width: 40%;
`;

export const UserPhoneWhatsApp = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const WhatsAppButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.shape};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-radius: 4px;
    position: relative;
    margin-top: 16px;
`;

export const UserInfoText = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    margin-left: 16px;
`;

export const WhatsAppText = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(12)}px;
`;




