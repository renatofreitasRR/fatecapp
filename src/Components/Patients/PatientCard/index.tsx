
import {
    PatientCard,
    PatientCardHeader,
    PatientInfos,
    PatientName,
    PatientImage,
    PatientLocalAddress,
    PatientCardFooter,
    VisitedButton,
    CancelButton,
    CancelButtonText,
    VisitedButtonText
} from './styles';

import { UserProps } from '../../../interfaces/patient';
import { returnEmptyIfValueIsNull } from '../../../utils/returnEmptyIfIsNull';
import { Alert } from 'react-native';
import { api } from '../../../services/api';
import { showToast } from '../../../utils/showToast';
import { useState } from 'react';
import { LoadingScreen } from '../../LoadingScreen';

interface PatientProps {
    patient: UserProps;
    handlePressEditPatient: () => void;
}

export function Patient({ patient, handlePressEditPatient }: PatientProps) {
    const [loading, setLoading] = useState(false);

    function handleShowAlertDelete() {
        Alert.alert(`Excluir paciente`, `Tem certeza que deseja excluir o paciente ${patient.nome}?`, [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Excluir', onPress: async () => handleDeletePatient() },
        ]);
    }

    async function handleDeletePatient() {
        try {
            setLoading(true);
            const response = await api.delete(`paciente/excluir/${patient.id}`);

            if (response.status === 200) {
                showToast('Paciente deletado com sucesso!', 'success', 'Sucesso!');
            }
        }
        catch (error: any) {
            console.log(error);
            showToast('Erro ao deletar paciente', 'error', 'Poxa, ocorreu um erro!');
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <>
            <PatientCard>
                <PatientCardHeader>
                    {/* <PatientImage source={{ uri: patient.fotoLink }} /> */}
                    <PatientInfos>
                        <PatientName>{patient.nome}</PatientName>
                        <PatientLocalAddress>
                            {
                                `${returnEmptyIfValueIsNull(patient.endereco.logradouro)}, ${returnEmptyIfValueIsNull(patient.endereco.numero)} ${returnEmptyIfValueIsNull(patient.endereco.complemento)} - ${returnEmptyIfValueIsNull(patient.endereco.bairro)}, ${returnEmptyIfValueIsNull(patient.endereco.localidade)} - ${returnEmptyIfValueIsNull(patient.endereco.uf)} `
                            }
                        </PatientLocalAddress>
                    </PatientInfos>
                </PatientCardHeader>
                <PatientCardFooter>
                    <CancelButton onPress={handleShowAlertDelete}>
                        <CancelButtonText>Deletar</CancelButtonText>
                    </CancelButton>
                    <VisitedButton onPress={handlePressEditPatient}>
                        <VisitedButtonText>Editar</VisitedButtonText>
                    </VisitedButton>
                </PatientCardFooter>
            </PatientCard>
            {
                loading && <LoadingScreen />
            }
        </>
    );
}