import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import {
    RelatoryCard,
    RelatoryCardHeader,
    RelatoryInfos,
    RelatoryName,
    RelatoryLocalAddress,
    RelatoryCardFooter,
    RelatorySchedule,
    VisitedButton,
    CancelButton,
    RelatoryScheduleInfos,
    RelatoryScheduleText,
    CancelButtonText,
    VisitedButtonText
} from './styles';

import theme from '../../../Global/styles/theme';
import { MarginTop } from '../../../Global/magin';
import { ViewAtentimentoProps } from '../../../interfaces/atendimento';
import { Alert } from 'react-native';
import { api } from '../../../services/api';
import { showToast } from '../../../utils/showToast';
import { useState } from 'react';
import { LoadingScreen } from '../../LoadingScreen';

interface RelatoryProps {
    relatory: ViewAtentimentoProps;
    handlePressEditRelatory: () => void;
}

export function Relatory({ relatory, handlePressEditRelatory }: RelatoryProps) {
    const [loading, setLoading] = useState(false);

    function handleShowAlertDelete() {
        Alert.alert(`Excluir Atendimento`, `Tem certeza que deseja excluir esse registro de Atendimento?`, [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Excluir', onPress: async () => handleDeleteRelatory() },
        ]);
    }

    async function handleDeleteRelatory() {
        try {
            setLoading(true);
            const response = await api.delete(`atendimento/excluir/${relatory.id}`);
            
            if (response.status === 200) {
                showToast('Atendimento deletado com sucesso!', 'success', 'Sucesso!');
            }
        }
        catch (error: any) {
            console.log(error);
            showToast('Erro ao deletar Atendimento', 'error', 'Poxa, ocorreu um erro!');
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <>
            <RelatoryCard>
                <RelatorySchedule>
                    <RelatoryScheduleInfos>
                        <MaterialIcons
                            name="calendar-today"
                            size={20}
                            color={theme.colors.primary}
                        />
                        <RelatoryScheduleText>{relatory.dataAtendimento.toString().split(" ")[0]}</RelatoryScheduleText>
                    </RelatoryScheduleInfos>
                </RelatorySchedule>
                <MarginTop></MarginTop>
                <RelatorySchedule>
                    <RelatoryScheduleInfos>
                        <FontAwesome5
                            name="user-injured"
                            size={20}
                            color={theme.colors.primary}
                        />
                        <RelatoryScheduleText>{relatory.nomePaciente}</RelatoryScheduleText>
                    </RelatoryScheduleInfos>
                    <RelatoryScheduleInfos>
                        <FontAwesome5
                            name="user-md"
                            size={20}
                            color={theme.colors.primary}
                        />
                        <RelatoryScheduleText>{relatory.nomeMedico}</RelatoryScheduleText>
                    </RelatoryScheduleInfos>
                </RelatorySchedule>
                <RelatoryCardFooter>
                    <CancelButton onPress={handleShowAlertDelete}>
                        <CancelButtonText>Deletar</CancelButtonText>
                    </CancelButton>
                    <VisitedButton>
                        <VisitedButtonText onPress={handlePressEditRelatory}>Editar</VisitedButtonText>
                    </VisitedButton>
                </RelatoryCardFooter>
            </RelatoryCard>
            {
                loading && <LoadingScreen />
            }
        </>
    );
}