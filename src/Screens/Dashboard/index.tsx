import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '../../Global/container';
import {
    PatientList,
    PatientListContainer,
    InputContainer
} from './styles';

import { TouchableOpacity } from 'react-native';
import { Button } from '../../Components/Forms/Button';
import { Input } from '../../Components/Forms/Input';
import { Relatory } from '../../Components/Relatories/RelatoryCard';
import { patientList } from '../../utils/patientList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatActionButton } from '../../Components/Forms/FloatActionButton';
import { LoadingScreen } from '../../Components/LoadingScreen';
import { api } from '../../services/api';
import { ViewAtentimentoProps } from '../../interfaces/atendimento';
import { RelatoryCardSkeleton } from '../../Components/Skeleton/RelatoryCardSkeleton';
import { NoData } from '../../Components/NoDataCard';


export function Dashboard({ navigation }: any) {
    const [loading, setLoading] = useState(false);
    const [searchRelatory, setSearchRelatory] = useState("");
    const [skeleton, setSkeleton] = useState(true);
    const [relatories, setRelatories] = useState<ViewAtentimentoProps[]>([]);

    const filteredRelatoriesBySearchInput = useMemo(() => {
        const searchRelatoryToUpper = searchRelatory.toUpperCase();
        return relatories.filter((user) =>
            user.nomeMedico.toUpperCase().includes(searchRelatoryToUpper)
            || user.nomePaciente.toUpperCase().includes(searchRelatoryToUpper)
        );
    }, [searchRelatory, relatories]);

    useEffect(() => {
        async function getAllRelatories() {
            var response = await api.post('/atendimento/listar-todos');

            var data = await response.data;
            setRelatories(data)
            setTimeout(() => {
                setSkeleton(false);
            }, 1000);
        }
        getAllRelatories();
    }, [relatories]);

    function handleGoToEdit() {
        setLoading(true);
        navigation.navigate('NestedCreateRelatory');
        setLoading(false);
    }

    return (
        <>
            <Container>
                <SafeAreaView>
                    <InputContainer>
                        <Input value={searchRelatory} placeholder='Pesquisar...' onChangeText={(text: string) => setSearchRelatory(text)} />
                    </InputContainer>
                </SafeAreaView>
                <PatientListContainer>
                    <PatientList>
                        {
                            skeleton
                                ?
                                <>
                                    <RelatoryCardSkeleton />
                                    <RelatoryCardSkeleton />
                                    <RelatoryCardSkeleton />
                                </>
                                :
                                relatories.length > 0
                                    ?
                                    filteredRelatoriesBySearchInput.map((relatory) => (
                                        <TouchableOpacity
                                            key={relatory.id}
                                            onPress={() => navigation.navigate('NestedRelatory', { relatory: relatory })}
                                        >
                                            <Relatory
                                                handlePressEditRelatory={() => navigation.navigate('NestedEditRelatory', { relatory: relatory })}
                                                relatory={relatory}
                                            />
                                        </TouchableOpacity>
                                    ))
                                    :
                                    <>
                                        <NoData maxWidth={450} text={'Não há atendimentos cadastrados no momento'} />
                                    </>
                        }
                    </PatientList>
                </PatientListContainer>
                <FloatActionButton
                    title='Cadastrar Relatório'
                    onPress={handleGoToEdit}
                />
            </Container>
            {
                loading && <LoadingScreen />
            }
        </>
    );
}
