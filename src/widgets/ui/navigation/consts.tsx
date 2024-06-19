import { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { MAIN_ROUTES } from '@/shared/lib'

export const items: MenuProps['items'] = [
    {
        label: <NavLink to={MAIN_ROUTES.main}>Главнаяя страница</NavLink>,
        key: MAIN_ROUTES.main,
        icon: <UserOutlined />,
    },
    {
        label: <NavLink to={MAIN_ROUTES.settings}>Настройки</NavLink>,
        key: MAIN_ROUTES.settings,
        icon: <SettingOutlined />,
    },
]
