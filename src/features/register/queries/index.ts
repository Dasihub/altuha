import {useMutation} from "react-query"
import {tFormRegister} from "@/features/register"
import {api} from "@/shared/api"
import {notification} from "antd"
import {useNavigate} from "react-router-dom"
import {MAIN_ROUTES} from "@/shared/lib"
import {AxiosError, AxiosResponse} from "axios"

export const useRegister = () => {
    const navigate = useNavigate()

    return useMutation<AxiosResponse, AxiosError, tFormRegister>(
        async ({email, login, password}) => {
            try {
                return await api({
                    url: "/auth/register",
                    method: "POST",
                    data: {
                        email: email.trim(),
                        username: login.trim(),
                        password: password.trim(),
                    },
                })
            } catch (e) {
                throw new Error(e)
            }
        },
        {
            onSuccess: ({status}) => {
                if (status === 201) {
                    notification.success({message: "Регистрация прошла успешна"})
                    return navigate(MAIN_ROUTES.auth)
                }

                if (status === 409) {
                    return notification.warning({message: "Пользователь с таким email уже существует"})
                }

                notification.warning({message: "Неправильный пароль или логин"})
            },
            onError: () => {
                notification.error({message: "Ошибка в сервере"})
            },
        },
    )
}
