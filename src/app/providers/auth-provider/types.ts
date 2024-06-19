import {tFormAuth} from "@/pages/auth-page/types.ts"

export interface IAuthContext {
    token: string
    message: string
    isAuth: boolean
    logout: () => void
    isLoading: boolean
    login: (data: tFormAuth) => void
}
