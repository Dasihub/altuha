import { IUsersParse } from '@/features/main'
import { TableColumnsType } from 'antd'

export const getColumn = (): TableColumnsType<{ id: number; username: string }> => [
    {
        title: 'Ник',
        dataIndex: 'username',
        key: 'username',
        render: (_, record: { id: number; username: string }) => (
            <a href={`https://www.instagram.com/${record.username}/`} target='_blank'>
                {record.username}
            </a>
        ),
    },
]
