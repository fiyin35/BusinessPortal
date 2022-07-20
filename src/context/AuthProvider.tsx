import { createContext, useState } from 'react';
import {Auth, AuthContextType} from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState<Auth>();

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

