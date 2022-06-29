import { Container } from '../../Global/container';
import { Image, Text, View, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import {
    Header,
    GoogleImage,
    GoogleInfosContent,
    Content,
    GoogleContent,
    Name,
    Welcome,
    LogoutButton,
    HorizontalView,
    HorizontalViewPatient,
    ContentWithLabelPatient,
    ContentWithLabel,
    HorizontalText
} from './styles';
import { useAuth } from '../../hooks/auth';
import LogoutIcon from '../../assets/images/logoutIcon.svg';
import IconPurple from '../../assets/images/heartPurple.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import React, { useEffect, useState } from 'react';
import { patientList } from '../../utils/patientList';
import { Relatory } from '../../Components/Relatories/RelatoryCard';
import { Patient } from '../../Components/Patients/PatientCard';
import { MarginRight } from '../../Global/magin';
import { PatientCardHome } from '../../Components/Patients/PatientCardHome';
import { RelatoryCardHome } from '../../Components/Relatories/RelatoryCardHome';
import { InputLabel } from '../../Components/Forms/Label';
import Animated from 'react-native-reanimated';
import { UserProps } from '../../interfaces/patient';
import { api } from '../../services/api';
import { PatientCardHomeSkeleton } from '../../Components/Skeleton/PatientCardHomeSkeleton';
import { NoData } from '../../Components/NoDataCard';
import { ViewAtentimentoProps } from '../../interfaces/atendimento';
import { RelatoryCardHomeSkeleton } from '../../Components/Skeleton/RelatoryCardHomeSkeleton';

export function Home({ navigation }: any) {
    const { user, userGoogle, signOut } = useAuth();
    const [patients, setPatients] = useState<UserProps[]>([]);
    const [relatories, setRelatories] = useState<ViewAtentimentoProps[]>([]);
    const [skeletonPatients, setSkeletonPatients] = useState(true);
    const [skeleton, setSkeleton] = useState(true);

    useEffect(() => {
        async function getAllPatients() {
            var response = await api.get(`/paciente/buscar-atendidos-por-medico/${user.id}`);

            var data = await response.data;
            setPatients(data)
            setTimeout(() => {
                setSkeletonPatients(false);
            }, 1000);
        }

        async function getAllRelatories() {
            var response = await api.get(`/atendimento/buscar-por-medico/${user.id}`);

            var data = await response.data;
            setRelatories(data)
            setTimeout(() => {
                setSkeleton(false);
            }, 1000);
        }

        getAllRelatories();
        getAllPatients();
    }, [patients]);

    return (
        <Container>
            <Header>
                <GoogleContent>
                    <GoogleImage>
                        <IconPurple />
                    </GoogleImage>
                    <GoogleInfosContent>
                        <Welcome>Bem vindo,</Welcome>
                        {
                            userGoogle.id
                                ?
                                <Name>{userGoogle.given_name}</Name>
                                :
                                <Name>{user.nome}</Name>
                        }
                    </GoogleInfosContent>
                    <LogoutButton onPress={() => signOut()}>
                        <LogoutIcon
                            width={RFValue(15)}
                            height={RFValue(15)}
                        />
                    </LogoutButton>
                </GoogleContent>
            </Header>
            <Content>
                <ContentWithLabelPatient>
                    <HorizontalText>Últimos Pacientes atendidos</HorizontalText>
                    <HorizontalViewPatient horizontal={true}>
                        {
                            skeletonPatients
                                ?
                                <>
                                    <PatientCardHomeSkeleton />
                                    <PatientCardHomeSkeleton />
                                </>
                                :
                                patients.length > 0
                                    ?
                                    patients.map((patient) => (
                                        <>
                                            <TouchableOpacity
                                                key={patient.id}
                                                onPress={() => navigation.navigate('NestedHomePatient', { patient: patient })}
                                            >
                                                <PatientCardHome
                                                    handlePressEditPatient={() => navigation.navigate('NestedEditPatients', { patient: patient })}
                                                    patient={patient}
                                                />
                                            </TouchableOpacity>
                                            <MarginRight></MarginRight>
                                        </>
                                    ))
                                    :
                                    <>
                                        <NoData text={'Não há registro de pacientes vinculados a você no momento!'} />
                                    </>
                        }
                    </HorizontalViewPatient>
                </ContentWithLabelPatient>
                <ContentWithLabel>
                    <HorizontalText>Meus Atendimentos</HorizontalText>
                    <HorizontalView horizontal={true}>
                        {
                            skeleton
                                ?
                                <>
                                    <RelatoryCardHomeSkeleton />
                                    <RelatoryCardHomeSkeleton />
                                </>
                                :
                                relatories.length > 0
                                    ?
                                    relatories.map((relatory) => (
                                        <>
                                            <TouchableOpacity
                                                key={relatory.id}
                                                onPress={() => navigation.navigate('NestedHomeRelatoryByPatient', { relatory: relatory })}
                                            >
                                                <RelatoryCardHome
                                                    relatory={relatory}
                                                />
                                            </TouchableOpacity>
                                            <MarginRight></MarginRight>
                                        </>
                                    ))
                                    :
                                    <>
                                        <NoData text={'Não há atendimentos vinculados a você no momento!'} />
                                    </>
                        }
                    </HorizontalView>
                </ContentWithLabel>
            </Content>
        </Container>
    );
}