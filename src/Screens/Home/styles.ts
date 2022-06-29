import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(40)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    padding-top: ${RFValue(50)}px;
    padding-left: ${RFValue(20)}px;
    padding-right: ${RFValue(20)}px;
`;

export const Content = styled.View`
    width: 100%;
    height: 100%;

    position: relative;
`;

export const GoogleContent = styled.View`
    padding-left: ${RFValue(20)}px;
    padding-right: ${RFValue(20)}px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

export const GoogleImage = styled.View`
    width: ${RFValue(65)}px;
    height: ${RFValue(65)}px;
    border-radius: 8px;
    background-color: ${({theme}) => theme.colors.secondary};
    align-items: center;
    justify-content: center;
`;

export const GoogleInfosContent = styled.View`
   width: ${RFValue(130)}px;
   height: ${RFValue(70)}px;

   display: flex;
   justify-content: space-between;
`;

export const Welcome = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const LogoutButton = styled.TouchableOpacity`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Name = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(24)}px;
`;


export const HorizontalView = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal : 20 }
})`
    width: 100%;

`;

export const HorizontalViewPatient = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal : 24 }
})`
    width: 100%;
`;

export const HorizontalText = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 16px;
    padding-left: ${RFValue(24)}px;
`;

export const ContentWithLabel= styled.View`
    position: absolute;
    margin-top: ${RFPercentage(16)}px;
    width: 100%;
`;


export const ContentWithLabelPatient = styled.View`
    position: absolute;
    top: -225px;
    margin-top: ${RFPercentage(15)}px;
    width: 100%;
`;
  

