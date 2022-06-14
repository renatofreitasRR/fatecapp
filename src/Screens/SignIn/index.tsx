import { Container } from '../../Global/container';
import {
    BackgroundPrimary,
    BackgroundSecondary,
    LogoText,
    Phrase,
    Button,
    ButtonText,
    ButtonLogin
} from './styles';

import GoogleLogo from '../../assets/images/google.svg';
import SolidLogo from '../../assets/images/logoSolid.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

export function SignIn({ navigation }: any) {
    const { user, signInWithGoogle } = useAuth();

    async function handleSignInWWithGoogle() {
        try {
            await signInWithGoogle();
        }
        catch (error: any) {
            console.log(error);
            Alert.alert('Erro', error.message);
        }
    }

    function goToLoginPage() {
        navigation.navigate('Login');
    }

    return (
        <Container>
            <BackgroundPrimary>
                <SolidLogo
                    width={RFValue(50)}
                    height={RFValue(50)}
                />
                <LogoText>Médico da Família</LogoText>
                <Phrase>
                    Acompanhe seus pacientes
                    de forma simples e eficiente!
                </Phrase>
            </BackgroundPrimary>
            <BackgroundSecondary>
                <Button
                    onPress={handleSignInWWithGoogle}
                >
                    <GoogleLogo
                        width={RFValue(30)}
                        height={RFValue(30)}
                    />
                    <ButtonText>
                        Entrar com o Google
                    </ButtonText>
                </Button>
                <ButtonLogin onPress={goToLoginPage}>
                    <SolidLogo
                        width={RFValue(30)}
                        height={RFValue(30)}
                    />
                    <ButtonText>
                        Entrar com email e senha
                    </ButtonText>
                </ButtonLogin>
            </BackgroundSecondary>
        </Container>
    );
}