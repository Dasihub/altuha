import { useQuery } from 'react-query'
import { api } from '@/shared/api'

export const useGetReport = (token: string, id: string) => {
    return useQuery<string>(
        ['report-ai', id],
        async () => {
            try {
                const { data } = await api({ url: `/AI/${id}/generate`, headers: { Authorization: `Bearer ${token}` }, method: 'POST' })
                return data
            } catch (e) {
                throw new Error(e)
            }
        },
        {
            enabled: !!token.length && !!id.length,
        },
    )
}
