import { Container } from '../../Global/container';
import { InputForm } from '../../Components/Forms/InputForm';
import { Button } from '../../Components/Forms/Button';

import {
    LoginContainer,
    Form,
    LoginText,
} from './styles';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { InputLabel } from '../../Components/Forms/Label';
import { MarginTop } from '../../Global/magin';
import { useAuth } from '../../hooks/auth';
import SolidLogo from '../../assets/images/logoSolid.svg';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { LoadingScreen } from '../../Components/LoadingScreen';
import { showToast } from '../../utils/showToast';

import ImageBack from '../../assets/images/loginBack.svg';
;
const schema = Yup.object().shape({
    email: Yup
        .string()
        .email('Formato de email incorreto')
        .required('O campo email é obrigatório'),

    senha: Yup
        .string()
        .required('O campo senha é obrigatório'),
});

interface FormData {
    email: string;
    senha: string;
}


export function Login({ navigation }: any) {
    const { control, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const { signInWithEmailAndPassword } = useAuth();
    const [loading, SetLoading] = useState(false);


    async function handleLogin(form: FormData) {
        try {
            SetLoading(true);
            await signInWithEmailAndPassword(form);
        }
        catch (error: any) {
            // showToast(error, 'error', 'Error!');
            SetLoading(false);
        } finally {
            SetLoading(false);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <LoginContainer>
                        <ImageBack
                            width={RFPercentage(30)}
                            height={RFPercentage(30)}
                        />
                        <LoginText>Login</LoginText>
                        <Form>
                            <InputLabel text='Email' isRequired={true} />
                            <InputForm
                                placeholder='Insira o Email'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                name='email'
                                control={control}
                                error={errors.email?.message}
                                onChangeText={(text) => {
                                    SetEmail(text);
                                    setValue('email', text);
                                }}
                                value={email}
                            />
                            <InputLabel text='Senha' isRequired={true} />
                            <InputForm
                                placeholder='Insira a senha'
                                autoCorrect={false}
                                name='senha'
                                autoCapitalize='none'
                                control={control}
                                error={errors.senha?.message}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    SetPassword(text);
                                    setValue('senha', text);
                                }}
                                value={password}
                            />
                        </Form>
                        <MarginTop />
                        <Button
                            title='Entrar'
                            onPress={handleSubmit(handleLogin)}
                        />
                    </LoginContainer>
                </Container>
            </TouchableWithoutFeedback >
            {
                loading && <LoadingScreen />
            }
        </>
    );
}