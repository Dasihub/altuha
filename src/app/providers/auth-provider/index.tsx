import { createContext, FC, ReactNode, useState } from 'react'
import { useAuth } from './queries.ts'
import { IAuthContext } from './types'
import { tFormAuth } from '@/pages/auth-page/types.ts'

export const AuthContext = createContext<Partial<IAuthContext>>({})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem(import.meta.env.VITE_TOKEN) || '')
    const [message, setMessage] = useState<string>('')
    const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem(import.meta.env.VITE_TOKEN))

    const { mutate, isLoading } = useAuth(setToken, setMessage, setIsAuth)

    const login = ({ username, password }: tFormAuth) => {
        setMessage('')
        mutate({ username, password })
    }

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem(import.meta.env.VITE_TOKEN)
    }

    return <AuthContext.Provider value={{ isAuth, login, logout, token, message, isLoading }}>{children}</AuthContext.Provider>
}
