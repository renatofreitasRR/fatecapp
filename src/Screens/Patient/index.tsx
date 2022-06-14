import React, { useMemo, useState } from 'react';
import { Container } from '../../Global/container';
import {
    Header,
    UserImage,
    UserNameContainer,
    FirstName,
    UserInfos,
    Content,
    UserContent,
    UserInfoText,
    UserPhone,
    Fields,
    OpenEmail,
    WhatsAppText,
    UserPhoneWhatsApp,
    UserEmail,
    UserContentPhone,
    WhatsAppButton
} from './styles';
import { FontAwesome, Entypo, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';

import theme from '../../Global/styles/theme';
import { Linking, ScrollView, TouchableOpacity } from 'react-native';
import { PatientDataProps } from '../../interfaces/patient';

export function NestedPatient({ route }: any) {
    const patient: PatientDataProps = route.params.patient;


    function goToPatientWhatsApp(userPhone: number) {
        Linking
            .openURL(`http://api.whatsapp.com/send?phone=${userPhone}`);
    }

    function callPatient(userPhone: number) {
        Linking
            .openURL(`tel:${userPhone}`);
    }

    function goToPatientEmail(userEmail: string) {
        Linking
            .openURL(`mailto:${userEmail}?subject=${encodeURI('Programa Médico da Família')}`);
    }

    function goToGoogleMaps(address: string) {
        Linking
            .openURL(`http://maps.google.com/?q=${encodeURI(address)}`);
    }


    return (
        <Container>
            <Header>
                <UserImage source={{ uri: patient.photo_url }} />
            </Header>
            <Content>
                <UserNameContainer>
                    <FirstName>{patient.name}</FirstName>
                </UserNameContainer>
                <UserInfos>
                    <Fields>
                        <UserEmail onPress={() => goToPatientEmail(patient.email)}>
                            <UserContent>
                                <Entypo
                                    name="email"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {patient.email}
                                </UserInfoText>
                            </UserContent>
                        </UserEmail>
                        <UserPhoneWhatsApp>
                            <UserContentPhone onPress={() => goToPatientWhatsApp(patient.phone)}>
                                <FontAwesome
                                    name="whatsapp"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {patient.phone}
                                </UserInfoText>
                            </UserContentPhone>
                            <WhatsAppButton onPress={() => callPatient(patient.phone)}>
                                <Feather
                                    name="phone-call"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </WhatsAppButton>
                            <WhatsAppButton onPress={() => goToPatientWhatsApp(patient.phone)}>
                                <AntDesign
                                    name="message1"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </WhatsAppButton>
                        </UserPhoneWhatsApp>
                        <UserContent>
                            <Entypo
                                name="documents"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                {patient.cpf}
                            </UserInfoText>
                        </UserContent>
                        <TouchableOpacity onPress={() => goToGoogleMaps(patient.address)}>
                            <UserContent>
                                <FontAwesome
                                    name="address-book-o"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                                <UserInfoText>
                                    {patient.address}
                                </UserInfoText>
                            </UserContent>
                        </TouchableOpacity>
                        <UserContent>
                            <MaterialIcons
                                name="date-range"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <UserInfoText>
                                14/05/2020
                            </UserInfoText>
                        </UserContent>
                    </Fields>
                </UserInfos>
            </Content>
        </Container >
    );
}