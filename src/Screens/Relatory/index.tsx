import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '../../Global/container';
import {
    UserNameContainer,
    FirstName,
    UserInfos,
    Content,
    UserContent,
    UserInfoText,
    Fields,
    HorizontalView,
    DrugsContainer,
    DrugsText,
    ModalContainer,
    UserContentModal
} from './styles';
import { FontAwesome, Entypo, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';

import theme from '../../Global/styles/theme';
import { Linking, ScrollView, TouchableOpacity, Modal, View, Pressable, Text, StyleSheet } from 'react-native';
import { UserProps } from '../../interfaces/patient';
import { api } from '../../services/api';
import { AtendimentoProps, ViewAtentimentoProps } from '../../interfaces/atendimento';
import { MarginRight } from '../../Global/magin';
import { RelatoryCardPatient } from '../../Components/Relatories/RelatoryCardPatient';
import { returnEmptyIfValueIsNull } from '../../utils/returnEmptyIfIsNull';
import { FontAwesome5 } from '@expo/vector-icons';
import { DrugsProps } from '../../interfaces/drugs';
import { InputLabel } from '../../Components/Forms/Label';

export function NestedRelatory({ route }: any) {
    const relatory: ViewAtentimentoProps = route.params.relatory;
    const [patientRelatory, setPatientRelatory] = useState<UserProps>();
    const [modalVisible, setModalVisible] = useState(false);

    const [drugName, setDrugName] = useState("");
    const [drugClass, setDrugClass] = useState("");
    const [drugsPrinciples, setDrugsPrinciples] = useState<string[]>([]);


    const [offset, setOffset] = useState(0);
    const scrollViewRef = useRef();

    const slowlyScrollDown = () => {
        const y = offset + 80;
        scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
        setOffset(y);
    }

    function handleOpenModalWithDrugsData(drug: DrugsProps) {
        setDrugName(drug.nome);
        setDrugClass(drug.classeTerapeutica);
        setDrugsPrinciples(drug.principiosAtivos);
        setModalVisible(true);
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalContainer>
                    <View style={styles.modalView}>
                        <InputLabel text='Nome' />
                        <UserContentModal>
                            <FontAwesome5
                                name="briefcase-medical"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {drugName}
                            </UserInfoText>
                        </UserContentModal>
                        <InputLabel text='Princípios Ativos' />
                        <UserContentModal>
                            <FontAwesome5
                                name="hand-holding-medical"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {drugsPrinciples.map((text) => (
                                    `${text},`
                                ))}
                            </UserInfoText>
                        </UserContentModal>
                        <InputLabel text='Classe Terapêutica' />
                        <UserContentModal>
                            <FontAwesome5
                                name="pills"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {drugClass}
                            </UserInfoText>
                        </UserContentModal>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </Pressable>
                    </View>
                </ModalContainer>
            </Modal>
            <Container>
                <Content>
                    <UserInfos>
                        <Fields ref={scrollViewRef}>
                            <InputLabel text='Paciente' />
                            <UserContent>
                                <FontAwesome5
                                    name="user-injured"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.nomePaciente}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='Médico' />
                            <UserContent>
                                <FontAwesome5
                                    name="user-md"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.nomeMedico}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='Condições Socioeconômicas' />
                            <UserContent>
                                <MaterialIcons
                                    name="healing"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.condicoesSocioeconomicas}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='Estado Atual do Paciente' />
                            <UserContent>
                                <FontAwesome5
                                    name="brain"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.estadoAtualPaciente}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='O Paciente está empregado?' />
                            <UserContent>
                                <MaterialIcons
                                    name="work"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.empregado ? 'Sim' : 'Não'}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='Data do Atendimento' />
                            <UserContent>
                                <MaterialIcons
                                    name="calendar-today"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {relatory.dataAtendimento.toString().split(" ")[0]}
                                </UserInfoText>
                            </UserContent>
                            <InputLabel text='Medicamentos' />
                            <HorizontalView horizontal={true}>
                                {
                                    relatory.medicamentos.length > 0
                                        ?
                                        relatory.medicamentos.map((drug: DrugsProps) => (
                                            <>
                                                <TouchableOpacity
                                                    key={drug.id}
                                                    onPress={() => handleOpenModalWithDrugsData(drug)}
                                                >
                                                    <DrugsContainer>
                                                        <DrugsText>
                                                            {drug.nome}
                                                        </DrugsText>
                                                    </DrugsContainer>
                                                </TouchableOpacity>
                                                <MarginRight></MarginRight>
                                            </>
                                        ))
                                        :
                                        <DrugsContainer>
                                            <DrugsText>
                                                Não há medicamentos cadastrados
                                            </DrugsText>
                                        </DrugsContainer>
                                }
                            </HorizontalView>
                        </Fields>
                    </UserInfos>
                </Content>
            </Container >
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: theme.colors.shape,
        borderRadius: 4,
        padding: 16,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: theme.colors.secondary,
        marginTop: 16
    },
    textStyle: {
        color: theme.colors.shape,
        textAlign: "center",
        fontFamily: theme.fonts.bold
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});