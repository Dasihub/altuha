import {FC} from 'react'
import { useGetImg } from '@/features/acount-info/queries'
import styles from '../styles.module.css'
import { Skeleton } from 'antd'

export const GetImg: FC<{id: string}> = ({id}) => {
    const {data, isLoading} = useGetImg(id)

    if (isLoading) {
        return <Skeleton.Image style={{width: '309px', height: '309px'}} active/>
    }

    return (
        <img alt='img' src={data ? URL.createObjectURL(data) : ''} className={styles.img}/>
    )
}
