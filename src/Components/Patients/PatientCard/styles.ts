import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const PatientCard = styled.View`
    width: 100%;
    max-width: ${RFValue(350)}px;
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
    /* justify-content: space-between; */
`;

export const PatientInfos = styled.View`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
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

export const PatientCardFooter = styled.View`
    width: 100%;
    height: ${RFValue(60)}px;
    border-radius: ${RFValue(4)}px;
    margin-top: ${RFValue(16)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const VisitedButton = styled.TouchableOpacity`
    width: ${RFValue(120)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(4)}px;
    background-color: ${({ theme }) => theme.colors.success};

    align-items: center;
    justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
    width: ${RFValue(120)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(4)}px;
    border: 2px solid ${({ theme }) => theme.colors.primary_light};

    align-items: center;
    justify-content: center;
`;

export const CancelButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    color:  ${({ theme }) => theme.colors.primary_light};
`;

export const VisitedButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    color:  ${({ theme }) => theme.colors.shape};
`;

