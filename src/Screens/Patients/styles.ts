import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface PatientsFilterButtonProps {
    isActive: boolean;
}

export const PatientFilters = styled.View`
    width: 100%;
    height: ${RFPercentage(30)}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${RFValue(16)}px;
    padding-right: ${RFValue(16)}px;
    padding-top: ${RFValue(48)}px;
`;

export const PatientList = styled.ScrollView`
    height: ${RFPercentage(55)}px;
`;

export const PatientsButtonList = styled.View`
    width: 100%;
    height: ${RFPercentage(12)}px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    border-radius: ${RFValue(4)}px;
    background-color: ${({ theme }) => theme.colors.primary_light};
`;

export const PatientListContainer = styled.View`
    width: 100%;
    padding-left: ${RFValue(16)}px;
    padding-right: ${RFValue(16)}px;
`;

export const PatientFiltersButton = styled.TouchableOpacity<PatientsFilterButtonProps>`
    width: ${RFValue(90)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(4)}px;
    align-items: center;
    justify-content: center;
    
    ${(props) => props.isActive && css`
        background-color: ${({ theme }) => theme.colors.primary};
    `}
`;

export const PatientFiltersButtonText = styled.Text<PatientsFilterButtonProps>`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    ${(props) => props.isActive ? 
    css`
        color: ${({ theme }) => theme.colors.shape};
    `:
    css`
        color: ${({ theme }) => theme.colors.text_dark};
    `
    }
`;


