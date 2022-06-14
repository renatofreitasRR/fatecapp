import React, { useMemo, useState } from 'react';
import { Container } from '../../Global/container';
import {
    PatientList,
    PatientFilters,
    PatientFiltersButton,
    PatientFiltersButtonText,
    PatientsButtonList,
    PatientListContainer
} from './styles';

import PressableButton from '../../Components/PressableButton';
import { Patient } from '../../Components/Patients/PatientCard';
import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native';
import { PatientDataProps } from '../../interfaces/patient';
import { Button } from '../../Components/Forms/Button';
import { Input } from '../../Components/Forms/Input';

const PatientData: PatientDataProps[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Renata Gonçalves',
        address: 'Rua Grauben do Monte Lima, Nº 98',
        cpf: '123.456.789-10',
        date_nasc: '01/01/2000',
        visiteStatus: 0,
        email: 'natogfreitas@gmail.com',
        phone: "5511945350528",
        photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Digona Freitas',
        address: 'Rua Alagoa Nova, Nº 45',
        cpf: '123.456.789-10',
        date_nasc: '01/01/2000',
        visiteStatus: 1,
        phone: "5511945350528",
        email: 'natogfreitas@gmail.com',
        photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Afranio Gonçalves',
        cpf: '123.456.789-10',
        date_nasc: '01/01/2000',
        address: 'Rua 3',
        visiteStatus: 1,
        phone: "5511945350528",
        email: 'natogfreitas@gmail.com',
        photo_url: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: '1cf2a796-649a-4866-9947-6b5e9a0e45bf',
        name: 'José Alencar',
        address: 'Rua 4',
        date_nasc: '01/01/2000',
        cpf: '123.456.789-10',
        visiteStatus: 2,
        phone: "5511945350528",
        email: 'natogfreitas@gmail.com',
        photo_url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
];

let PatientFilterPressButtonsData = [
    {
        title: 'Para Visitar',
        isActive: true,
        filterType: 0
    },
    {
        title: 'Visitados',
        isActive: false,
        filterType: 1
    },
    {
        title: 'Cancelados',
        isActive: false,
        filterType: 2
    }
]

export function Patients({ navigation }: any) {
    const [filters, setFilters] = useState(PatientFilterPressButtonsData);
    const [filterType, setFilterType] = useState(0);
    const [searchPatient, setSearchPatient] = useState("");

    const filteredButtons = useMemo(() => {
        return filters;
    }, [filters]);

    const filteredPatients = useMemo(() => {
        return PatientData.filter(patient => patient.visiteStatus === filterType);
    }, [filters, PatientData]);

    const filteredPatientsBySearchInput = useMemo(() => {
        const searchUserToUpper = searchPatient.toUpperCase();
        return filteredPatients.filter((user) =>
            user.name.toUpperCase().includes(searchUserToUpper)
            || user.email.toUpperCase().includes(searchUserToUpper)
            || user.cpf.toUpperCase().includes(searchUserToUpper)
            || user.name.toUpperCase().includes(searchUserToUpper)
            || user.address.toUpperCase().includes(searchUserToUpper)
        );
    }, [searchPatient, filteredPatients, filters]);

    function handleSelectButton(buttonIndex: number) {
        let patientFilterButtonsDataLength = PatientFilterPressButtonsData.length;
        let newFilters = [];
        for (let index = 0; index < patientFilterButtonsDataLength; index++) {
            const element = PatientFilterPressButtonsData[index];

            if (index === buttonIndex)
                element.isActive = true;
            else
                element.isActive = false;

            newFilters.push(element);
            setFilterType(buttonIndex);
        }

        setFilters(newFilters);
    }

    return (
        <Container>
            <PatientFilters>
                <PatientsButtonList>
                    {filteredButtons.map((item, index) => (
                        <PatientFiltersButton onPress={() => handleSelectButton(item.filterType)} isActive={item.isActive} key={index}>
                            <PatientFiltersButtonText isActive={item.isActive}>{item.title}</PatientFiltersButtonText>
                        </PatientFiltersButton>
                    ))}
                </PatientsButtonList>
                <Input value='' placeholder='Pesquisar...' onChangeText={(text: string) => setSearchPatient(text)} />
            </PatientFilters>
            <PatientListContainer>
                <PatientList>
                    {filteredPatientsBySearchInput.map((patient) => (
                        <TouchableOpacity
                            key={patient.id}
                            onPress={() => navigation.navigate('NestedPatient', { patient: patient })}
                        >
                            <Patient
                                handlePressEditPatient={() => navigation.navigate('NestedEditPatients', { patient: patient })}
                                patient={patient}
                            />
                        </TouchableOpacity>
                    ))}
                </PatientList>
                <Button
                    title='Cadastrar Paciente'
                    onPress={() => navigation.navigate('NestedRegisterPatients', { msg: "From Screen 1" })}
                />
            </PatientListContainer>
        </Container>
    );
}