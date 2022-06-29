import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import {
    RelatoryCard,
    RelatoryCardHeader,
    RelatoryInfos,
    RelatoryName,
    RelatoryLocalAddress,
    RelatorySchedule,
    RelatoryScheduleInfos,
    RelatoryScheduleText,
} from './styles';

import theme from '../../../Global/styles/theme';
import { shadow } from '../../../Global/shadow';
import { ViewAtentimentoProps } from '../../../interfaces/atendimento';

interface RelatoryCardPatientProps{
    relatory: ViewAtentimentoProps;
}

export function RelatoryCardPatient({ relatory  }: RelatoryCardPatientProps) {
    return (
        <RelatoryCard>
            <RelatoryCardHeader>
                <RelatoryInfos>
                    <RelatoryName>{relatory.nomeMedico}</RelatoryName>
                </RelatoryInfos>
            </RelatoryCardHeader>
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
        </RelatoryCard>
    );
}