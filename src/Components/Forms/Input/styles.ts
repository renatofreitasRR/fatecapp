import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';

export const Container = styled(MaskInput)`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    background-color: ${({ theme }) => theme.colors.shape};
    color: ${({ theme }) => theme.colors.text_dark};
    border-radius: 4px;
    margin-bottom: 8px;
`;

