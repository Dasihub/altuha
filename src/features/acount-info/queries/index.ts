import { useQuery } from 'react-query'
import { api } from '@/shared/api'

export const useGetReport = (token: string, id: string, modalAI: boolean) => {
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
            enabled: !!token.length && !!id.length && modalAI,
        },
    )
}

export const useGetImg = ( id: string) => {
    return useQuery(['img'], async () => {
        try {
            const {data} = await api({url: `/media/static/${id}`, method: 'POST', responseType: 'blob'})

            return data
        } catch (e) {
            console.log(e)
        }
    }, {
        refetchInterval: false,
        refetchOnWindowFocus: false
    })
}
