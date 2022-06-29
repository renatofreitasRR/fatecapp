import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Container } from '../../Global/container';
import {
    Header,
    UserImage,
    UserNameContainer,
    FirstName,
    UserInfos,
    Content,
    UserContent,
    UserInfoText,
    Fields,
    UserPhoneWhatsApp,
    UserEmail,
    UserContentPhone,
    WhatsAppButton,
    HorizontalView,
    RelatoriesText
} from './styles';
import { FontAwesome, Entypo, MaterialIcons, Feather, Zocial } from '@expo/vector-icons';

import theme from '../../Global/styles/theme';
import { Linking, ScrollView, TouchableOpacity } from 'react-native';
import { UserProps } from '../../interfaces/patient';
import { api } from '../../services/api';
import { ViewAtentimentoProps } from '../../interfaces/atendimento';
import { MarginRight } from '../../Global/magin';
import { RelatoryCardPatient } from '../../Components/Relatories/RelatoryCardPatient';
import { returnEmptyIfValueIsNull } from '../../utils/returnEmptyIfIsNull';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NoData } from '../../Components/NoDataCard';
import { PatientCardHomeSkeleton } from '../../Components/Skeleton/PatientCardHomeSkeleton';
import { RelatoryCardHomeSkeleton } from '../../Components/Skeleton/RelatoryCardHomeSkeleton';
import { InputLabel } from '../../Components/Forms/Label';
import { formatDate } from '../../utils/dateFormat';

export function NestedPatient({ navigation, route }: any) {
    const patient: UserProps = route.params.patient;
    const [patientRelatories, setPatientRelatories] = useState<ViewAtentimentoProps[]>([]);
    const [skeleton, setSkeleton] = useState(true);

    const [offset, setOffset] = useState(0);
    const scrollViewRef = useRef();

    const slowlyScrollDown = () => {
        const y = offset + 80;
        scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
        setOffset(y);
    }

    function goToPatientWhatsApp(userPhone: string) {
        console.log(userPhone);
        Linking
            .openURL(`http://api.whatsapp.com/send?phone=${encodeURI(userPhone)}`);
    }

    function callPatient(userPhone: string) {
        Linking
            .openURL(`tel:${userPhone}`);
    }

    function goToPatientEmail(userEmail: string) {
        Linking
            .openURL(`mailto:${userEmail}?subject=${encodeURI('Programa Médico da Família')}`);
    }

    function goToGoogleMaps(address: string) {
        Linking
            .openURL(`http://maps.google.com/?q=${encodeURI(address)}`);
    }

    useEffect(() => {
        async function getAllRelatories() {
            var response = await api.get(`atendimento/buscar-por-paciente/${patient.id}`);

            var data = await response.data;
            setPatientRelatories(data);
            setTimeout(() => {
                setSkeleton(false);
            }, 1000);
        }
        getAllRelatories();
    }, [])


    return (
        <Container>
            <Content>
                <UserNameContainer>
                    <FirstName>{patient.nome}</FirstName>
                </UserNameContainer>
                <UserInfos>
                    <Fields ref={scrollViewRef}>
                        <InputLabel text={'Email'} />
                        <UserContent>
                            <MaterialIcons
                                name="email"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {patient.email}
                            </UserInfoText>
                        </UserContent>
                        <InputLabel text={'CPF'} />
                        <UserContent>
                            <Entypo
                                name="documents"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {patient.cpf}
                            </UserInfoText>
                        </UserContent>
                        <InputLabel text={'Telefone'} />
                        <UserContent>
                            <FontAwesome
                                name="mobile-phone"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {patient.telefone}
                            </UserInfoText>
                        </UserContent>
                        <InputLabel text={'Endereço'} />
                        <UserContent>
                            <FontAwesome
                                name="address-card-o"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {
                                    `${returnEmptyIfValueIsNull(patient.endereco.logradouro)}, ${returnEmptyIfValueIsNull(patient.endereco.numero)} ${returnEmptyIfValueIsNull(patient.endereco.complemento)} - ${returnEmptyIfValueIsNull(patient.endereco.bairro)}, ${returnEmptyIfValueIsNull(patient.endereco.localidade)} - ${returnEmptyIfValueIsNull(patient.endereco.uf)} `
                                }
                            </UserInfoText>
                        </UserContent>
                        <InputLabel text={'Data de Nascimento'} />
                        <UserContent>
                            <MaterialIcons
                                name="calendar-today"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {formatDate(patient.dataNascimento)}
                            </UserInfoText>
                        </UserContent>
                        <InputLabel text={'Ações'} />
                        <UserPhoneWhatsApp>
                            <WhatsAppButton onPress={() => goToPatientEmail(patient.email)}>
                                <Entypo
                                    name="email"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </WhatsAppButton>
                            <WhatsAppButton onPress={() => goToGoogleMaps(`${returnEmptyIfValueIsNull(patient.endereco.logradouro)}, ${returnEmptyIfValueIsNull(patient.endereco.numero)} ${returnEmptyIfValueIsNull(patient.endereco.complemento)} - ${returnEmptyIfValueIsNull(patient.endereco.bairro)}, ${returnEmptyIfValueIsNull(patient.endereco.localidade)} - ${returnEmptyIfValueIsNull(patient.endereco.uf)} `)}>
                                <MaterialCommunityIcons
                                    name="google-maps"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </WhatsAppButton>
                            <WhatsAppButton onPress={() => callPatient(patient.telefone)}>
                                <Feather
                                    name="phone-call"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </WhatsAppButton>
                            <WhatsAppButton onPress={() => goToPatientWhatsApp(patient.telefone)}>
                                <FontAwesome
                                    name="whatsapp"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </WhatsAppButton>
                        </UserPhoneWhatsApp>
                        <RelatoriesText>Atendimentos</RelatoriesText>
                        <HorizontalView horizontal={true}>
                            {
                                skeleton
                                    ?
                                    <>
                                        <RelatoryCardHomeSkeleton />
                                        <RelatoryCardHomeSkeleton />
                                    </>
                                    :
                                    patientRelatories.length > 0
                                        ?
                                        patientRelatories.map((relatory: ViewAtentimentoProps) => (
                                            <>
                                                <TouchableOpacity
                                                    key={relatory.id}
                                                    onPress={() => navigation.navigate('NestedViewRelatoryByPatient', { relatory: relatory })}
                                                >
                                                    <RelatoryCardPatient
                                                        relatory={relatory}
                                                    />
                                                </TouchableOpacity>
                                                <MarginRight></MarginRight>
                                            </>
                                        ))
                                        :
                                        <>
                                            <NoData text={'Não há atendimentos vinculados a este paciente no momento!'} />
                                        </>
                            }
                        </HorizontalView>
                    </Fields>
                </UserInfos>
            </Content>
        </Container >
    );
}