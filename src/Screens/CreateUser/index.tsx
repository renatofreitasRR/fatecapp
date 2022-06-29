import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, Keyboard, TextInputBase, TextInput } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { SaveUserProps } from '../../interfaces/patient';
import { InputLabel } from '../../Components/Forms/Label';
import { Masks } from 'react-native-mask-input';
import React, { useEffect, useState } from 'react';
import { showToast } from '../../utils/showToast';
import { api } from '../../services/api';
import { MarginTop } from '../../Global/magin';
import { LoadingScreen } from '../../Components/LoadingScreen';

const schema = Yup.object().shape({
    nome: Yup
        .string()
        .required('O campo nome é obrigatório'),

    cpf: Yup
        .string()
        .required('O campo cpf é obrigatório'),

    email: Yup
        .string()
        .required('O campo email é obrigatório'),

    telefone: Yup
        .string()
        .min(15, 'O campo telefone deve ter no mínimo 11 caracteres')
        .max(15, 'O campo telefone deve ter no máximo 11 caracteres')
        .required('O campo telefone é obrigatório'),

    endereco: Yup.object().shape({
        bairro: Yup
            .string()
            .required('O campo bairro é obrigatório'),

        cep: Yup
            .string()
            .min(9, 'O campo cep deve ter no mínimo 8 caracteres')
            .max(9, 'O campo cep deve ter no máximo 8 caracteres')
            .required('O campo cep é obrigatório'),

        complemento: Yup
            .string(),

        localidade: Yup
            .string()
            .required('O campo cidade é obrigatório'),

        logradouro: Yup
            .string()
            .required('O campo logradouro é obrigatório'),

        numero: Yup
            .string()
            .nullable(),

        uf: Yup
            .string()
            .max(2)
            .required('O campo UF é obrigatório'),
    }),

    dataNascimento: Yup
        .string()
        .required('O campo data de nascimento é obrigatório'),
});


interface enderecoProps {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    numero: string;
    uf: string;
}

export function NestedRegisterPatients({ navigation }: any) {
    const { setValue, control, getFieldState, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [name, setName] = useState('');
    const [perfil, setPefil] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [uf, setUf] = useState('');
    const [dateNasc, setDateNasc] = useState('');
    
    const [loading, setLoading] = useState(false);

    async function handleCreateUser(form: SaveUserProps) {
        console.log(form);
        const [day, month, year] = form.dataNascimento.toString().split('/');
        form.dataNascimento = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        form.perfil = 'Paciente';
        try {
            setLoading(true);
            const response = await api.post('paciente/salvar', form);
            if (response.status == 201) {
                showToast('Paciente cadastrado com sucesso!', 'success', 'Sucesso!');
                navigation.navigate('Patients');
            }
        }
        catch (error: any) {
            console.log("Erro ocorreu", error);
            showToast('Ocorreu um erro!', 'error', 'Erro ao cadastrar paciente!');
        }
        finally{
            setLoading(false);
        }
    }

    async function searchCep() {
        try{
            setLoading(true);
            const response = await api.get(`endereco/consultar-cep/${cep}`);

            const data = await response.data;
            const { logradouro, bairro, localidade, uf, complemento, numero, } = data;
            if (data.cep == null) {
                showToast('Cep não encontrado!', 'error', 'Erro!');
                setCep("");
                setValue('endereco.cep', "");
                return;
            }
    
            setBairro(bairro);
            setComplemento(complemento);
            setNumero(numero);
            setLocalidade(localidade);
            setLogradouro(logradouro);
    
            setUf(uf);
            setValue('endereco.bairro', data);
            setValue('endereco.uf', uf);
            setValue('endereco.complemento', complemento);
            setValue('endereco.numero', numero);
            setValue('endereco.logradouro', logradouro);
            setValue('endereco.localidade', localidade);
            setValue('endereco.bairro', bairro);
        }
        catch(error: any){
            showToast('Erro ao realizar a busca de CEP', 'error', 'Poxa, ocorreu um erro!');
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
       
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Title>Registrar Paciente</Title>
                    </Header>
                    <Form>
                        <Fields>
                            <InputLabel text='Nome' isRequired={true} />
                            <InputForm
                                placeholder='Insira o nome'
                                keyboardType='name-phone-pad'
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                name='nome'
                                control={control}
                                error={errors.nome?.message}
                                onChangeText={(text) => {
                                    setName(text);
                                    setValue('nome', text);
                                }}
                                value={name}
                            />
                            <InputLabel text='CPF' isRequired={true} />
                            <InputForm
                                placeholder='Insira o cpf'
                                keyboardType='decimal-pad'
                                name='cpf'
                                control={control}
                                error={errors.cpf?.message}
                                mask={Masks.BRL_CPF}
                                onChangeText={(text) => {
                                    setCpf(text);
                                    setValue('cpf', text);
                                }}
                                value={cpf}
                            />
                            <InputLabel text='Email' isRequired={true} />
                            <InputForm
                                placeholder='Insira o email'
                                keyboardType='email-address'
                                name='email'
                                control={control}
                                error={errors.email?.message}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setValue('email', text);
                                }}
                                value={email}
                            />
                            {/* <InputLabel text='Perfil' isRequired={true} />
                            <InputForm
                                placeholder='Insira o perfil'
                                keyboardType='default'
                                name='perfil'
                                control={control}
                                error={errors.perfil?.message}
                                onChangeText={(text) => {
                                    setPefil(text);
                                    setValue('perfil', text);
                                }}
                                value={'Paciente'}
                                editable={false}
                            /> */}
                            <InputLabel text='CEP' isRequired={true} />
                            <InputForm
                                placeholder='Insira o CEP'
                                keyboardType='number-pad'
                                name='endereco.cep'
                                onBlur={searchCep}
                                control={control}
                                mask={Masks.ZIP_CODE}
                                error={errors.endereco?.cep?.message}
                                onChangeText={(text) => {
                                    setCep(text);
                                    setValue('endereco.cep', text);
                                }}
                                value={cep}
                            />
                            <InputLabel text='Bairro' isRequired={true} />
                            <InputForm
                                placeholder='Insira o bairro'
                                keyboardType='default'
                                name='endereco.bairro'
                                control={control}
                                error={errors.endereco?.bairro?.message}
                                onChangeText={(text) => {
                                    setBairro(text);
                                    setValue('endereco.bairro', text);
                                }}
                                value={bairro}
                            />
                            <InputLabel text='Complemento' />
                            <InputForm
                                placeholder='Insira o complemento'
                                keyboardType='default'
                                name='endereco.complemento'
                                control={control}
                                error={errors.endereco?.complemento?.message}
                                onChangeText={(text) => {
                                    setComplemento(text);
                                    setValue('endereco.complemento', text);
                                }}
                                value={complemento}
                            />
                            <InputLabel text='Cidade' isRequired={true} />
                            <InputForm
                                placeholder='Insira a cidade'
                                keyboardType='default'
                                name='endereco.localidade'
                                control={control}
                                error={errors.endereco?.localidade?.message}
                                onChangeText={(text) => {
                                    setLocalidade(text);
                                    setValue('endereco.localidade', text);
                                }}
                                value={localidade}
                            />
                            <InputLabel text='Logradouro' isRequired={true} />
                            <InputForm
                                placeholder='Insira o logradouro'
                                keyboardType='default'
                                name='endereco.logradouro'
                                control={control}
                                error={errors.endereco?.logradouro?.message}
                                onChangeText={(text) => {
                                    setLogradouro(text);
                                    setValue('endereco.logradouro', text);
                                }}
                                value={logradouro}
                            />
                            <InputLabel text='Nº' />
                            <InputForm
                                placeholder='Insira o numero'
                                keyboardType='default'
                                name='endereco.numero'
                                control={control}
                                error={errors.endereco?.numero?.message}
                                onChangeText={(text) => {
                                    setNumero(text);
                                    setValue('endereco.numero', text);
                                }}
                                value={numero}
                            />
                            <InputLabel text='UF' isRequired={true} />
                            <InputForm
                                placeholder='Insira a UF'
                                keyboardType='default'
                                name='endereco.uf'
                                control={control}
                                error={errors.endereco?.uf?.message}
                                maxLength={2}
                                autoCapitalize='characters'
                                onChangeText={(text) => {
                                    setUf(text);
                                    setValue('endereco.uf', text);
                                }}
                                value={uf}
                            />
                            <InputLabel text='Telefone' isRequired={true} />
                            <InputForm
                                placeholder='Insira o telefone'
                                keyboardType='number-pad'
                                name='telefone'
                                autoComplete='off'
                                control={control}
                                error={errors.telefone?.message}
                                mask={Masks.BRL_PHONE}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    setValue('telefone', text);
                                }}
                                value={phone}
                            />
                            <InputLabel text='Data de Nascimento' isRequired={true} />
                            <InputForm
                                placeholder='Insira a data de nascimento'
                                keyboardType='numeric'
                                name='dataNascimento'
                                control={control}
                                error={errors.dataNascimento?.message}
                                mask={Masks.DATE_DDMMYYYY}
                                onChangeText={(text) => {
                                    setDateNasc(text);
                                    setValue('dataNascimento', text);
                                }}
                                value={dateNasc}
                            />
                            <MarginTop />
                            <Button
                                title='Salvar'
                                onPress={handleSubmit(handleCreateUser)}
                            />
                        </Fields>
                    </Form>
                </Container>
            </TouchableWithoutFeedback>
            {
                loading && <LoadingScreen />
            }
        </>
    );
}