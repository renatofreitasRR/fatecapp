import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import {
    PatientCard,
    PatientCardHeader,
    PatientInfos,
    PatientName,
    PatientImage,
    PatientLocalAddress,
    PatientCardFooter,
    PatientSchedule,
    VisitedButton,
    CancelButton,
    PatientScheduleInfos,
    PatientScheduleText,
    CancelButtonText,
    VisitedButtonText
} from './styles';

import theme from '../../../Global/styles/theme';
import { PatientDataProps } from '../../../interfaces/patient';

interface PatientProps {
    patient: PatientDataProps;
    handlePressEditPatient: () => void;
}


export function Patient({ patient, handlePressEditPatient }: PatientProps) {
    return (
        <PatientCard>
            <PatientCardHeader>
                <PatientImage source={{ uri: patient.photo_url }} />
                <PatientInfos>
                    <PatientName>{patient.name}</PatientName>
                    <PatientLocalAddress>{patient.address}</PatientLocalAddress>
                </PatientInfos>
            </PatientCardHeader>
            <PatientSchedule>
                <PatientScheduleInfos>
                    <MaterialIcons
                        name="calendar-today"
                        size={20}
                        color={theme.colors.primary}
                    />
                    <PatientScheduleText>Segunda-Feira, Ago 30</PatientScheduleText>
                </PatientScheduleInfos>
                <PatientScheduleInfos>
                    <MaterialIcons
                        name="watch-later"
                        size={20}
                        color={theme.colors.primary}
                    />
                    <PatientScheduleText>11:00 - 12:00</PatientScheduleText>
                </PatientScheduleInfos>
            </PatientSchedule>
            <PatientCardFooter>
                <CancelButton>
                    <CancelButtonText>Inativar</CancelButtonText>
                </CancelButton>
                <VisitedButton onPress={handlePressEditPatient}>
                    <VisitedButtonText>Editar</VisitedButtonText>
                </VisitedButton>
            </PatientCardFooter>
        </PatientCard>
    );
}