import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, Keyboard, TextInputBase, TextInput, Alert, ToastAndroid, addons } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import {
    Header,
    Form,
    Fields
} from './styles';
import { Container } from '../../Global/container';
import { Title } from '../../Global/title';
import { Input } from '../../Components/Forms/Input';
import { Button } from '../../Components/Forms/Button';
import { InputForm } from '../../Components/Forms/InputForm';
import { PatientDataProps } from '../../interfaces/patient';
import { InputLabel } from '../../Components/Forms/Label';
import { Masks } from 'react-native-mask-input';
import { useEffect, useState } from 'react';
import { showToast } from '../../utils/showToast';

interface FormData {
    name: string;
    cpf: number;
    email: string;
    address: string;
    date_nas: string;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('O campo nome é obrigatório'),

    cpf: Yup
        .string()
        .required('O campo cpf é obrigatório'),

    email: Yup
        .string()
        .required('O campo email é obrigatório'),

    phone: Yup
        .string()
        .required('O campo telefone é obrigatório'),

    address: Yup
        .string()
        .required('O campo endereço é obrigatório'),

    date_nasc: Yup
        .string()
        .required('O campo data de nascimento é obrigatório'),
});




export function NestedEditPatients({ route }: any) {
    const { setValue, control, getValues, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const patient: PatientDataProps = route.params.patient;

    const [name, setName] = useState(patient.name);
    const [cpf, setCpf] = useState(patient.cpf);
    const [email, setEmail] = useState(patient.email);
    const [phone, setPhone] = useState(patient.phone);
    const [address, setAddress] = useState(patient.address);
    const [dateNasc, setDateNasc] = useState(patient.date_nasc);

    function handleEditUser(form: FormData) {
        showToast('Paciente editado com sucesso!', 'success', 'Sucesso!');
    }

    useEffect(() => {
        setValue('name', patient.name);
        setValue('cpf', patient.cpf);
        setValue('email', patient.email);
        setValue('phone', patient.phone);
        setValue('address', patient.address);
        setValue('date_nasc', patient.date_nasc);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Editar Paciente</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputLabel>Nome</InputLabel>
                        <InputForm
                            placeholder='Insira o nome'
                            keyboardType='name-phone-pad'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            name='name'
                            control={control}
                            error={errors.name?.message}
                            onChangeText={(text) => {
                                setName(text);
                                setValue('name', text);
                            }}
                            defaultValue={patient.name}
                            value={name}
                        />
                        <InputLabel>CPF</InputLabel>
                        <InputForm
                            placeholder='Insira o cpf'
                            keyboardType='decimal-pad'
                            name='cpf'
                            control={control}
                            error={errors.cpf?.message}
                            defaultValue={patient.cpf}
                            mask={Masks.BRL_CPF}
                            onChangeText={(text) => {
                                // setValue('cpf', text);
                                setCpf(text);
                            }}
                            value={cpf}
                        />
                        <InputLabel>Email</InputLabel>
                        <InputForm
                            placeholder='Insira o email'
                            keyboardType='email-address'
                            name='email'
                            control={control}
                            error={errors.email?.message}
                            defaultValue={patient.email}
                            onChangeText={(text) => {
                                setEmail(text);
                                // setValue('email', text);
                            }}
                            value={email}
                        />
                        <InputLabel>Endereço</InputLabel>
                        <InputForm
                            placeholder='Insira o endereço'
                            keyboardType='default'
                            name='address'
                            control={control}
                            error={errors.address?.message}
                            defaultValue={patient.address}
                            onChangeText={(text) => {
                                setAddress(text);
                                // setValue('address', text);
                            }}
                            value={address}
                        />
                        <InputLabel>Telefone</InputLabel>
                        <InputForm
                            placeholder='Insira o telefone'
                            keyboardType='number-pad'
                            name='phone'
                            control={control}
                            error={errors.phone?.message}
                            mask={Masks.BRL_PHONE}
                            defaultValue={patient.phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                // setValue('phone', text);
                            }}
                            value={phone}
                        />
                        <InputLabel>Data de Nascimento</InputLabel>
                        <InputForm
                            placeholder='Insira a data de nascimento'
                            keyboardType='numeric'
                            name='date_nasc'
                            control={control}
                            error={errors.date_nasc?.message}
                            defaultValue={patient.date_nasc.toString()}
                            mask={Masks.DATE_DDMMYYYY}
                            onChangeText={(text) => {
                                setDateNasc(text);
                                // setValue('date_nasc', text);
                            }}
                            value={dateNasc}
                        />
                    </Fields>
                    <Button
                        title='Salvar Edição'
                        onPress={handleSubmit(handleEditUser)}
                    />
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    );
}