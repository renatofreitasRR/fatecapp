import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


export const PatientCard = styled.View`
    width: 100%;
    max-width: ${RFValue(300)}px;
    border-radius: ${RFValue(8)}px;
    padding: ${RFValue(16)}px;

    background-color: ${({ theme }) => theme.colors.shape};

    margin-bottom: ${RFValue(32)}px;
    
`;

export const PatientCardHeader = styled.View`
    width: 100%;
    height: ${RFValue(90)}px;

    flex-direction: row;
    align-items: center;
`;

export const PatientInfos = styled.View`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${RFValue(150)}px;
    max-width: ${RFValue(250)}px;
`;

export const PatientName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;

    color:  ${({ theme }) => theme.colors.title};
`;

export const PatientLocalAddress = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    margin-top: ${RFValue(8)}px;
    color:  ${({ theme }) => theme.colors.text_medium};
 `;

export const PatientImage = styled.Image`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    border-radius: 100px;
    margin-right: ${RFValue(16)}px;
    background-color: ${({ theme }) => theme.colors.primary};
`;

