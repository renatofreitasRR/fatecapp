import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const PatientCardSkeleton = styled.View`
    width: 100%;
    max-width: ${RFValue(350)}px;
    border-radius: ${RFValue(8)}px;

    background-color: ${({ theme }) => theme.colors.shape};

    margin-bottom: ${RFValue(32)}px;
    height: ${RFValue(200)}px;
    
`;
