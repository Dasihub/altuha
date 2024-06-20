import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IUsersParse } from '@/features/main'
import { api } from '@/shared/api'
import { notification } from 'antd'

export const useUserList = (token: string) => {
    return useQuery<IUsersParse[]>(
        ['user-list'],
        async () => {
            try {
                const { data } = await api({
                    url: '/parce/results',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                return data
            } catch (e) {
                throw new Error(e)
            }
        },
        {
            enabled: !!token.length,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: Infinity
        },
    )
}

export const useGenerateParser = (token: string) => {
    const queryClient = useQueryClient()

    return useMutation(
        async ({ users }: { users: string[] }) => {
            try {
                const { status } = await api({
                    url: '/parce/parse_profiles/',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: users,
                })
                return status
            } catch (e) {
                console.log(e)
            }
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    queryClient.invalidateQueries('user-list')
                    return notification.success({ message: 'Парсинг прошла успешно ждите результат' })
                }

                return notification.warning({ message: 'Не удалось спарсит' })
            },
        },
    )
}
