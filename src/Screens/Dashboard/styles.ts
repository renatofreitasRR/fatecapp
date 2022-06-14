import styled from 'styled-components/native';
import { RFPercentage }  from 'react-native-responsive-fontsize';

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(40)}px;
    background-color: ${({theme}) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
`;
