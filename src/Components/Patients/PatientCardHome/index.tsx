import {
    PatientCard,
    PatientCardHeader,
    PatientInfos,
    PatientName,
    PatientImage,
    PatientLocalAddress,
} from './styles';

import { UserProps } from '../../../interfaces/patient';
import { shadow } from '../../../Global/shadow';

interface PatientProps {
    patient: UserProps;
    handlePressEditPatient: () => void;
}

export function PatientCardHome({ patient, handlePressEditPatient }: PatientProps) {
    return (
        <PatientCard>
            <PatientCardHeader>
                {/* <PatientImage source={{ uri: patient.fotoLink }} /> */}
                <PatientInfos>
                    <PatientName>{patient.nome}</PatientName>
                    <PatientLocalAddress>
                        {`${patient.endereco.logradouro} - ${patient.endereco.uf}`}
                    </PatientLocalAddress>
                </PatientInfos>
            </PatientCardHeader>
        </PatientCard>
    );
}