import { RightOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { MAIN_ROUTES } from '@/shared/lib'
import { Image, TableColumnsType } from 'antd'
import { NotImgProfile } from '@/shared/assets'
import { IUsersParse } from '@/features/main'

export const getColumn = (): TableColumnsType<IUsersParse> => [
    {
        title: 'Фото',
        dataIndex: 'profile_picture_url',
        key: 'profile_picture_url',
        align: 'center',
        width: 200,
        render: (_, record: IUsersParse) => {
            if (record) {
                return (
                    <Image
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                        height={80}
                        src={record.profile_picture_url || NotImgProfile}
                    />
                )
            }
        },
    },
    {
        title: 'Ник',
        dataIndex: 'profile_name',
        key: 'profile_name',
        align: 'center',
    },
    {
        title: 'Закрытый или открытый',
        dataIndex: 'is_private',
        align: 'center',
        key: 'is_private',
        render: (_, record: IUsersParse) => {
            if (!record?.is_private) {
                return 'Открытый'
            }
            return 'Закрытый'
        },
    },
    {
        title: 'Биография',
        dataIndex: 'biography',
        key: 'biography',
        align: 'center',
    },
    {
        title: 'Количество подпичсиков',
        dataIndex: 'followers',
        key: 'followers',
        align: 'center',
        render: (_, record: IUsersParse) => {
            if (record) {
                return record.followers.length
            }
        },
    },
    {
        title: 'Количество подписок',
        dataIndex: 'followers',
        key: 'followers',
        align: 'center',
        render: (_, record: IUsersParse) => {
            if (record) {
                return record.followees.length
            }
        },
    },
    {
        title: 'Перейти',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (_, record: any) => (
            <NavLink to={`${MAIN_ROUTES.account}/${record.id}`}>
                <RightOutlined />
            </NavLink>
        ),
    },
]
