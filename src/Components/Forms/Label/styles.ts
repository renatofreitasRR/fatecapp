import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Label = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.text_dark};
    margin-bottom: 8px;
`;


