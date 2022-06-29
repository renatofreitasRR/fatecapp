import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as AuthSession from 'expo-auth-session';
import { AsyncStorage } from 'react-native';
import { showToast } from '../utils/showToast';
import { api } from '../services/api';
import { UserProps } from '../interfaces/patient';

// const { CLIENT_ID } = process.env;
// const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    userGoogle: User;
    user: UserProps;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    signInWithEmailAndPassword(loginForm: any): Promise<void>;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
}

interface GoogleAuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

interface User {
    email: string,
    family_name: string,
    given_name: string,
    id: string,
    locale: string,
    name: string,
    picture: string,
    verified_email: boolean,
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [userGoogle, setUserGoogle] = useState<User>({} as User);
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserStoredData() {
            const userGoogleStoraged = await AsyncStorage.getItem('@fatecapp:user');
            const userStoraged = await AsyncStorage.getItem('@fatecapp:userLogin');

            if (userGoogleStoraged) {
                setUserGoogle(JSON.parse(userGoogleStoraged));
            }

            if(userStoraged){
                setUser(JSON.parse(userStoraged));
            }

            setIsLoading(false);
        }

        loadUserStoredData();
    }, [])

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const CLIENT_ID = '690309583052-m87ut1squt7bo56rkehp871md38n3hmq.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@renatofordevs/fatecapp';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({
                authUrl,
            }) as GoogleAuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userData = await response.json();
                setUserGoogle(userData);
                showToast('Autenticado com sucesso!', 'success', 'Sucesso!');
                await AsyncStorage.setItem('@fatecapp:user', JSON.stringify(userData));
            }
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async function signInWithEmailAndPassword(loginForm: any) {
        try {
            console.log(loginForm);
            const response = await api.post('/login/', loginForm);
            if(response.status === 200){
                setUser(response.data);
                showToast('Autenticado com sucesso!', 'success', 'Sucesso!');
                await AsyncStorage.setItem('@fatecapp:userLogin', JSON.stringify(response.data));
            }
        }
        catch (error: any) {
            showToast('Email ou Senha incorretos.', 'error', 'Não foi possível autenticar');
            throw new Error(error);
        }
    }

    async function signOut() {
        setUserGoogle({} as User);
        setUser({} as UserProps);
        await AsyncStorage.removeItem('@fatecapp:user');
        await AsyncStorage.removeItem('@fatecapp:userLogin');
    }

    return (
        <AuthContext.Provider value={{
            userGoogle,
            user,
            signInWithGoogle,
            signOut,
            signInWithEmailAndPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}


export { AuthProvider, useAuth };

