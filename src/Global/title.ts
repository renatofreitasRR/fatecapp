import styled from 'styled-components/native';
import { RFPercentage, RFValue }  from 'react-native-responsive-fontsize';

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(32)}px;
    color: ${({theme}) => theme.colors.title};
`;

