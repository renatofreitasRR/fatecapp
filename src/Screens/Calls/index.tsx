import React, { useMemo, useState } from 'react';
import { Container } from '../../Global/container';
import {
} from './styles';

import PressableButton from '../../Components/PressableButton';
import { Patient } from '../../Components/Patients/PatientCard';
import { TouchableOpacity } from 'react-native';
import { Title } from '../../Global/title';

interface PatientDataProps {
    id: string,
    name: string,
    address: string,
    visiteStatus: Boolean,
}

const CallsData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        address: 'Rua 1',
        visiteStatus: 0,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
        address: 'Rua 2',
        visiteStatus: 1,
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Third Item',
        address: 'Rua 3',
        visiteStatus: 1,
    },
    {
        id: '1cf2a796-649a-4866-9947-6b5e9a0e45bf',
        name: 'Fourth Item',
        address: 'Rua 4',
        visiteStatus: 2,
    },
];


export function NestedCalls({ route }: any) {
    const patient: PatientDataProps = route.params.patient;
    return (
        <Container>
            <Title>
                {patient.name}
            </Title>
            <PressableButton title='Cadastrar Relatório' onPress={() => console.log('Oi')} />
        </Container>
    );
}