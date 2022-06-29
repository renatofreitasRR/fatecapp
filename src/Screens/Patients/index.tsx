import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '../../Global/container';
import { Text } from 'react-native'
import {
    PatientList,
    PatientListContainer,
    InputContainer,
} from './styles';

import PressableButton from '../../Components/PressableButton';
import { Patient } from '../../Components/Patients/PatientCard';
import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native';
import { UserProps } from '../../interfaces/patient';
import { Button } from '../../Components/Forms/Button';
import { Input } from '../../Components/Forms/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../services/api';
import { FloatActionButton } from '../../Components/Forms/FloatActionButton';
import { Skeleton } from '../../Components/Skeleton';
import { PatientCardSkeleton } from '../../Components/Skeleton/PatientCardSkeleton';
import { NoData } from '../../Components/NoDataCard';


export function Patients({ navigation }: any) {
    const [searchPatient, setSearchPatient] = useState("");
    const [patients, setPatients] = useState<UserProps[]>([]);
    const [skeleton, setSkeleton] = useState(true);
    useEffect(() => {
        async function getAllPatients() {
            var response = await api.get('/paciente/listar-todos');
            var data: UserProps[] = await response.data;
            setPatients(data)
            setTimeout(() => {
                setSkeleton(false);
            }, 1000);
        }

        getAllPatients();
    }, [patients]);

    const filteredPatientsBySearchInput = useMemo(() => {
        const searchUserToUpper = searchPatient.toUpperCase();
        return patients.filter((user) =>
            user.nome.toUpperCase().includes(searchUserToUpper)
            || user.email.toUpperCase().includes(searchUserToUpper)
            || user.cpf.toUpperCase().includes(searchUserToUpper)
        );
    }, [searchPatient, patients]);

    return (
        <Container>
            <SafeAreaView>
                <InputContainer>
                    <Input value={searchPatient} placeholder='Pesquisar...' onChangeText={(text: string) => setSearchPatient(text)} />
                </InputContainer>
            </SafeAreaView>
            <PatientListContainer>
                <PatientList>
                    {
                        skeleton
                            ?
                            <>
                                <PatientCardSkeleton />
                                <PatientCardSkeleton />
                                <PatientCardSkeleton />
                            </>
                            :
                            patients.length > 0
                                ?
                                filteredPatientsBySearchInput.map((patient) => (
                                    <TouchableOpacity
                                        key={patient.id}
                                        onPress={() => navigation.navigate('NestedPatient', { patient: patient })}
                                    >
                                        <Patient
                                            handlePressEditPatient={() => navigation.navigate('NestedEditPatients', { patient: patient })}
                                            patient={patient}
                                        />
                                    </TouchableOpacity>
                                ))
                                :
                                <>
                                    <NoData maxWidth={550} text={'Não há pacientes cadastrados no momento!'} />
                                </>
                    }
                </PatientList>
            </PatientListContainer>
            <FloatActionButton
                title='Cadastrar Paciente'
                onPress={() => navigation.navigate('NestedRegisterPatients', { msg: "From Screen 1" })}
            />
        </Container>
    );
}