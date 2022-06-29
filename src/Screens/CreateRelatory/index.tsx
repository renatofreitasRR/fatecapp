import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, Keyboard, Switch, TextInputBase, TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
import { EditUserProps, SaveUserProps, UserProps } from '../../interfaces/patient';
import { InputLabel } from '../../Components/Forms/Label';
import { Masks } from 'react-native-mask-input';
import { useEffect, useRef, useState } from 'react';
import { showToast } from '../../utils/showToast';
import { api } from '../../services/api';

import SelectDropdown from 'react-native-select-dropdown';
import { MarginRight, MarginTop } from '../../Global/magin';
import theme from '../../Global/styles/theme';
import { AtendimentoProps, SaveAtendimentoProps } from '../../interfaces/atendimento';
import { useAuth } from '../../hooks/auth';
import { LoadingScreen } from '../../Components/LoadingScreen';
import { formatDateTime } from '../../utils/dateFormat';
import { DrugsProps } from '../../interfaces/drugs';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
const schema = Yup.object().shape({
    condicoesSocioeconomicas: Yup
        .string()
        .required('O campo Condições Socioeconômicas é obrigatório'),

    estadoAtualPaciente: Yup
        .string()
        .required('O campo Estado Atual do Paciente é obrigatório'),
});

export function NestedCreateRelatory({ navigation }: any) {
    const { setValue, control, getFieldState, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [patients, setPatients] = useState<UserProps[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<UserProps>();
    const [conditions, setConditions] = useState("");
    const [haveWork, setHaveWork] = useState(Boolean);
    const [userState, setUserState] = useState("");
    const toggleSwitch = () => setHaveWork(previousState => !previousState);
    const { user, userGoogle, signOut } = useAuth();

    const [drugs, setDrugs] = useState<DrugsProps[]>([]);
    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef();

    function onSelectedItemsChange(selectedItems: any) {
        setSelectedDrugs(selectedItems)
    }

    useEffect(() => {
        async function getAllPatients() {
            var response = await api.get('/paciente/listar-todos');

            var data = await response.data;
            setPatients(data)
        }
        async function getAllDrugs() {
            var response = await api.get('/medicamento/listar');
            var data = await response.data;
            setDrugs(data)
        }
        getAllPatients();
        getAllDrugs();
    }, []);

    async function handleSaveRelatory(form: SaveAtendimentoProps) {
        form.idMedico = user.id;
        form.empregado = haveWork;
        form.idsMedicamentosAdministrados = selectedDrugs;
        const currentDate = new Date();
        const [day, month, year] = formatDateTime(currentDate).split('/');
        const datetext = currentDate.toTimeString().split(' ')[0];
        const [hours, minutes, seconds] = datetext.split(":");
        currentDate.setHours(currentDate.getHours());
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setSeconds(currentDate.getSeconds());
        currentDate.setFullYear(parseInt(year));
        currentDate.setMonth(parseInt(month) - 1);
        currentDate.setDate(parseInt(day) - 1);
        form.dataAtendimento = currentDate;
        if (selectedPatient != undefined) {
            form.idPaciente = selectedPatient.id;
        }
        else {
            showToast('Selecione um paciente para continuar', 'error', 'Adicione um paciente!');
            return;
        }
        try {
            console.log(form);
            setLoading(true);
            const response = await api.post('atendimento/salvar', form);
            if (response.status == 201) {
                showToast('Atendimento registrado com sucesso!', 'success', 'Sucesso!');
                navigation.navigate('HomeDashboard');
            }
        }
        catch (error: any) {
            setLoading(false);
            console.log("Erro ocorreu", error);
            showToast('Ocorreu um erro!', 'error', 'Erro ao cadastrar atendimento!');
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Title>Registrar Atendimento</Title>
                    </Header>
                    <Form>
                        <Fields>
                            <InputLabel text='Paciente' isRequired={true} />
                            <SelectDropdown
                                renderSearchInputLeftIcon={(selectedItem, index) => (
                                    <MaterialIcons name="search" size={20} />
                                )}
                                searchPlaceHolder={'Procurar paciente'}
                                
                                selectedRowStyle={{
                                    backgroundColor: theme.colors.primary_light
                                }}
                                rowTextStyle={{
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: 16,
                                    textAlign: 'center',
                                }}
                                buttonStyle={{
                                    width: '100%',
                                    backgroundColor: theme.colors.shape,
                                    marginBottom: 16,
                                    borderRadius: 4,
                                }}
                                searchInputStyle={{
                                    backgroundColor: '#ccc'
                                }}
                                rowStyle={{
                                    backgroundColor: theme.colors.shape,
                                    display: 'flex',
                                    alignContent: 'flex-start',
                                    width: '100%',
                                }}
                                dropdownStyle={{
                                    backgroundColor: theme.colors.shape,
                                    borderRadius: 6,
                                }}
                                search={true}
                                defaultButtonText='Selecione um paciente'
                                data={patients}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setSelectedPatient(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.nome
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.nome
                                }}
                            />
                            <InputLabel text='Estado Atual do Paciente' isRequired={true} />
                            <InputForm
                                placeholder='Insira o texto'
                                keyboardType='name-phone-pad'
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                name='estadoAtualPaciente'
                                control={control}
                                multiline={true}
                                numberOfLines={4}
                                error={errors.estadoAtualPaciente?.message}
                                onChangeText={(text) => {
                                    setUserState(text);
                                    setValue('estadoAtualPaciente', text);
                                }}
                                value={userState}
                            />
                            <InputLabel text='Condições Socioeconômicas' isRequired={true} />
                            <InputForm
                                placeholder='Insira o texto'
                                keyboardType='name-phone-pad'
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                name='condicoesSocioeconomicas'
                                control={control}
                                multiline={true}
                                numberOfLines={4}
                                error={errors.condicoesSocioeconomicas?.message}
                                onChangeText={(text) => {
                                    setConditions(text);
                                    setValue('condicoesSocioeconomicas', text);
                                }}
                                value={conditions}
                            />
                            <InputLabel text='O Paciente está empregado atualmente?' isRequired={true} />
                            <Switch
                                trackColor={{ false: theme.colors.text_medium, true: theme.colors.success }}
                                thumbColor={haveWork ? theme.colors.secondary : theme.colors.text_dark}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={haveWork}
                                style={{
                                    width: 50,
                                }}
                            />
                            <InputLabel text='Medicamentos Aplicados' />
                            <View>
                                <SectionedMultiSelect<DrugsProps>
                                    uniqueKey="id"
                                    displayKey="nome"
                                    onSelectedItemsChange={onSelectedItemsChange}
                                    selectedItems={selectedDrugs}
                                    items={drugs}
                                    noItemsComponent={<Text>A busca não encontrou nenhum item</Text>}
                                    selectedIconOnLeft={false}
                                    confirmText={'Confirmar'}
                                    searchPlaceholderText={'Procurar medicamentos'}
                                    selectText={'Lista de medicamentos'}
                                    selectedText={'Selecionados'}
                                    ref={ref}
                                    styles={{
                                        button: {
                                            backgroundColor: theme.colors.primary,
                                        },
                                        selectedItem: {
                                            backgroundColor: theme.colors.primary_light,
                                            width: '100%',
                                        },
                                        item: {
                                            padding: 0,
                                        },
                                        selectToggle: {
                                            backgroundColor: theme.colors.shape,
                                            borderRadius: 4,
                                            paddingHorizontal: 18,
                                            paddingVertical: 16
                                        },
                                        searchBar:{
                                            backgroundColor: '#ccc'
                                        },
                                    }}
                                    customChipsRenderer={(props) => (
                                        <ScrollView
                                            horizontal
                                            style={{
                                                height: 58,
                                                width: '100%'
                                            }}
                                            contentContainerStyle={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                padding: 8
                                            }}
                                        >
                                            {selectedDrugs.map((itemId) => {
                                                const item = drugs.find(({ id }) => id == itemId)
                                                return (
                                                    <View
                                                        style={{
                                                            marginRight: 10,
                                                            alignItems: 'center',
                                                            marginBottom: 6,
                                                            paddingVertical: 2,
                                                            backgroundColor: 'white',
                                                            borderRadius: 4,
                                                            flexDirection: 'row',
                                                            borderColor: theme.colors.primary,
                                                            borderWidth: 1
                                                        }}
                                                        key={item?.id}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                                color: theme.colors.primary,
                                                                marginLeft: 16
                                                            }}
                                                        >
                                                            {item?.nome}
                                                        </Text>
                                                        <TouchableOpacity
                                                            style={{ padding: 4, marginRight: 8 }}
                                                            onPress={() => ref.current?._removeItem(item)}
                                                        >
                                                            <AntDesign name="closecircle" size={18} color={theme.colors.error} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}
                                        </ScrollView>
                                    )}
                                    IconRenderer={MaterialIcons}
                                    icons={{
                                        check: {
                                            name: 'check-circle',
                                            style: {
                                                color: theme.colors.success
                                            },
                                            size: 22
                                        },
                                        search: {
                                            name: 'search',
                                            color: '#333',
                                            size: 22
                                        }
                                    }}
                                />
                            </View>
                            <MarginTop />
                            <Button
                                title='Salvar'
                                onPress={handleSubmit(handleSaveRelatory)}
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