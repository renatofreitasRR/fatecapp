import styled from 'styled-components/native';
import { RFValue }  from 'react-native-responsive-fontsize';


export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: ${RFValue(4)}px;

  width: 100%;
  height: ${RFValue(40)}px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text};
  text-align: center;
  font-weight: bold;
`;