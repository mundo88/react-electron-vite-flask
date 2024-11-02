import { createContext, useEffect, useState } from 'react'
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate';

export interface IAuthContext {
    currentUser: IUser,
    setCurrentUser?: (currentUser: object) => void,
    accessToken: string | null,
    refreshToken: string | null,
    csrftoken?: string | null,
    setAccessToken: (accessToken: string) => void,
    setRefreshToken: (refreshToken: string) => void,
    setCSRFToken: (csrftoken: string) => void,
}


export const AuthContext = createContext<IAuthContext>({
    currentUser: {},
    accessToken: null,
    refreshToken: null,
    csrftoken: null,
    setAccessToken: () => { },
    setRefreshToken: () => { },
    setCSRFToken: () => { },
});

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<IUser>({})
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [csrftoken, setCSRFToken] = useState("")
    const {axiosServerInstance} = useAxiosPrivate()

    useEffect(() => {
        console.log('accessToken', accessToken)
        if (accessToken) {
            getCurrentUser();
        }
    }, [accessToken]);
    
    const getCurrentUser = async () => {
        if (!accessToken) return;
        console.log('accessToken', accessToken)
        const { data } = await axiosServerInstance.get('users/me')
        setCurrentUser(data);
    };


    return <AuthContext.Provider value={{
        currentUser, setCurrentUser,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        csrftoken, setCSRFToken,
    }}>
        {children}
    </AuthContext.Provider>
}
export default AuthContext
