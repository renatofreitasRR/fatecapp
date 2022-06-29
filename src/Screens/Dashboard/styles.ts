import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const PatientList = styled.ScrollView`
    width: 100%;
    margin-bottom: 120px;
`;

export const PatientListContainer = styled.View`
    width: 100%;
    align-items: center;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
`;

export const InputContainer = styled.View`
    padding-top: ${RFValue(20)}px;
    width: 100%;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
`;




