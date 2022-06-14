import { Container } from '../../Global/container';
import { InputForm } from '../../Components/Forms/InputForm';
import { Button } from '../../Components/Forms/Button';

import {
    LoginContainer,
    Form,
    LoginText
} from './styles';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from '../InitialPage/styles';

const schema = Yup.object().shape({
    email: Yup
        .string()
        .email('Formato de email incorreto')
        .required('O campo email é obrigatório'),

    password: Yup
        .string()
        .required('O campo senha é obrigatório'),
});

interface FormData {
    email: string;
    pasword: string;
}


export function Login({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    function handleLogin(form: FormData) {
        console.log(form);
        navigation.navigate("Initial");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <LoginContainer>
                    <LoginText>Login</LoginText>
                    <Form>
                        <InputForm
                            placeholder='Insira o Email'
                            keyboardType='email-address'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            name='email'
                            control={control}
                            error={errors.email?.message}
                        />
                        <InputForm
                            placeholder='Insira a sua senha'
                            keyboardType='default'
                            secureTextEntry={true}
                            name='password'
                            control={control}
                            error={errors.password?.message}
                        />
                    </Form>
                    <Button
                        title='Entrar'
                        onPress={handleSubmit(handleLogin)}
                    />
                </LoginContainer>
            </Container>
        </TouchableWithoutFeedback>
    );
}