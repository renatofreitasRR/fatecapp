import styled from 'styled-components/native';
import { RFPercentage, RFValue }  from 'react-native-responsive-fontsize';

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    background-color: ${({theme}) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom:  ${RFValue(20)}px;
`;

export const Form = styled.View`
    padding: ${RFValue(24)}px;
    width: 100%;
    flex: 1;
    justify-content: space-between;
`;

export const Fields = styled.ScrollView`
`;
