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
import { MarginLeft, MarginRight } from '../../../Global/magin';

interface RelatoryCardHomeProps {
    relatory: ViewAtentimentoProps;
}

export function RelatoryCardHome({ relatory }: RelatoryCardHomeProps) {
    return (
        <RelatoryCard>
            <RelatoryCardHeader>
                <RelatoryInfos>
                    <FontAwesome5
                        name="user-injured"
                        size={20}
                        color={theme.colors.title}
                    />
                    <RelatoryName>
                        {relatory.nomePaciente}
                    </RelatoryName>
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