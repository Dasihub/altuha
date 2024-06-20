import { FC, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MAIN_ROUTES } from '@/shared/lib'
import { MainPage } from '@/pages/main-page'
import { AuthContext } from '@/app/providers'
import { AccountInfoPage } from '@/pages/account-info-page'
import { SettingPage } from '@/pages/setting-page'
import { AuthPage } from '@/pages/auth-page'
import { RegisterPage } from '@/pages/register-page'
import { NotPage } from '@/pages/not-page'

export const Routing: FC = () => {
    const { isAuth } = useContext(AuthContext)

    if (!isAuth) {
        return (
            <Routes>
                <Route path={MAIN_ROUTES.auth} element={<AuthPage />} />
                <Route path={MAIN_ROUTES.register} element={<RegisterPage />} />
                <Route path={MAIN_ROUTES.main} element={<Navigate to={MAIN_ROUTES.auth} replace />} />
                <Route path='*' element={<NotPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={MAIN_ROUTES.auth} element={<Navigate to={MAIN_ROUTES.main} replace />} />
            <Route path={MAIN_ROUTES.main} element={<MainPage />} />
            <Route path={MAIN_ROUTES.settings} element={<SettingPage />} />
            <Route path={`${MAIN_ROUTES.account}/:id`} element={<AccountInfoPage />} />
            <Route path='*' element={<NotPage />} />
        </Routes>
    )
}
