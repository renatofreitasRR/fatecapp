import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as AuthSession from 'expo-auth-session';
import { AsyncStorage } from 'react-native';

// const { CLIENT_ID } = process.env;
// const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
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
    const [user, setUser] = useState<User>({} as User);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserStoredData() {
            const userStoraged = await AsyncStorage.getItem('@fatecapp:user');

            if (userStoraged) {
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
                setUser(userData);

                await AsyncStorage.setItem('@fatecapp:user', JSON.stringify(userData));
            }
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem('@fatecapp:user');
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut
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

