import { Title } from '../../Global/title';
import { Container } from '../../Global/container';
import PressableButton from '../../Components/PressableButton';
import LoginSplash from '../../assets/images/loginImage.png';

import { Image, View } from 'react-native';

import {
    InitialPageContainer,
    AppLogo,
    LoginImage,
    Text,
    InitialPageButtonsContainer
} from './styles';

export function InitialPage({ navigation }: any) {
    return (
        <Container>
            <InitialPageContainer>
                <AppLogo />
                <Title>Health!</Title>
                <LoginImage resizeMode='contain' source={LoginSplash} />
                <InitialPageButtonsContainer>
                    <PressableButton title='Login' onPress={() => navigation.navigate("Login")} />
                </InitialPageButtonsContainer>
            </InitialPageContainer>
        </Container>
    );
}