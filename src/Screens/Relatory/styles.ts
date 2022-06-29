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
    position: relative;
`;

export const UserNameContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Content = styled.View`
    padding: ${RFValue(16)}px;
`;

export const FirstName = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(25)}px;
`;
export const UserInfos = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* padding: ${RFValue(16)}px; */
    border-radius: 4px;
    position: relative;
    margin-top: 16px;
`;

export const Fields = styled.ScrollView`
    width: 100%;
    /* height: ${RFPercentage(60)}px; */
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
`;

export const UserEmail = styled.TouchableOpacity`
    width: 100%;
`;


export const UserInfoText = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    margin-left: 16px;
`;

export const RelatoriesText = styled.Text`
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(24)}px;
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const HorizontalView = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 0 }
})`
    width: 100%;
    margin-top: 16px;
`;


export const DrugsContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.shape};
    padding: 12px;
    border-radius: 4px;
`;


export const DrugsText = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(10)}px;
`;

export const ModalContainer = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UserContentModal = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(16)}px 0;
    border-radius: 4px;
    position: relative;

    /* border: 2px solid; */
    /* border-color: ${({ theme }) => theme.colors.primary}; */
`;



