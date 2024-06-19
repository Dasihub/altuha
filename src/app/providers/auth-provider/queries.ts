import { Dispatch, SetStateAction } from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTES } from '@/shared/lib'
import { tFormAuth } from '@/pages/auth-page/types.ts'

export const useAuth = (
    setToken: Dispatch<SetStateAction<string>>,
    setMessage: Dispatch<SetStateAction<string>>,
    setIsAuth: Dispatch<SetStateAction<boolean>>,
) => {
    const navigate = useNavigate()

    return useMutation<AxiosResponse<{ access_token: string; token_type: string }>, AxiosError, tFormAuth>(
        async ({ username, password }) => {
            try {
                return await axios({
                    method: 'POST',
                    data: { username: username.trim(), password: password.trim() },
                    url: import.meta.env.VITE_BASE_URL + '/auth/token',
                    validateStatus: status => status < 499,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            } catch (e) {
                throw new Error(e)
            }
        },
        {
            onSuccess: ({ status, data }) => {
                if (status === 200) {
                    setToken(data.access_token)
                    setIsAuth(true)
                    localStorage.setItem(import.meta.env.VITE_TOKEN, data.access_token)
                    return navigate(MAIN_ROUTES.main)
                }

                // if (status === 401) {
                setMessage('Неправильный пароль или логин')
                // }
            },
            onError: () => {
                setMessage('Ошибка в сервере')
            },
        },
    )
}
