import { Container } from '../../Global/container';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import {
    Header,
    GoogleImage,
    GoogleInfosContent,
    Content,
    GoogleContent,
    Name,
    Welcome,
    LogoutButton
} from './styles';
import { useAuth } from '../../hooks/auth';
import LogoutIcon from '../../assets/images/logoutIcon.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import React from 'react';

export function Home() {
    const { user, signOut } = useAuth();

    return (
        <Container>
            <Header>
                <GoogleContent>
                    <GoogleImage source={{ uri: user.picture }} />
                    <GoogleInfosContent>
                        <Welcome>Bem vindo,</Welcome>
                        <Name>{user.given_name}</Name>
                    </GoogleInfosContent>
                    <LogoutButton onPress={()=> signOut()}>
                        <LogoutIcon
                            width={RFValue(15)}
                            height={RFValue(15)}
                        />
                    </LogoutButton>
                </GoogleContent>
            </Header>
            <Content>
            </Content>
        </Container>
    );
}