import { FC, useContext, useMemo, useState } from 'react'
import { Button, Divider, Flex, Image, Modal, Spin, Table, Tag, Typography } from 'antd'
import { getColumn } from './conts.tsx'
import { useParams } from 'react-router-dom'
import { IUserPost, IUsersParse, useUserList } from '@/features/main'
import styles from './styles.module.css'
import { AuthContext } from '@/app/providers'
import { useGetReport } from '@/features/acount-info/queries'
import {GetImg} from './get-img'

export const Account: FC = () => {
    const { id } = useParams<{ id: string }>()
    const { token } = useContext(AuthContext)
    const [modal, setModal] = useState<'' | 'Подписчики' | 'Подписки'>('')
    const [modalAI, setModalAI] = useState<boolean>(false)

    const columns = getColumn()

    const { data: report, isLoading: isLoadingReport } = useGetReport(token, id, modalAI)

    const { data: userParser, isLoading: loadingParser } = useUserList(token)

    const showModal = (str: '' | 'Подписчики' | 'Подписки') => setModal(str)
    const hideModal = () => setModal('')

    const user = useMemo<IUsersParse>(() => {
        if (userParser) {
            const u = userParser.find(item => item.id == Number(id))
            return u
        }
    }, [userParser, loadingParser])

    const userModal = () => {
        if (modal === 'Подписчики') {
            return user.followers
        }
        if (modal === 'Подписки') {
            return user.followees
        }
        return []
    }

    if (loadingParser) {
        return (
            <Flex justify='center'>
                <Spin size='large' />
            </Flex>
        )
    }

    if (!user) {
        return <Typography.Title style={{ textAlign: 'center' }}>Пользователь не найден</Typography.Title>
    }

    return (
        <>
            {!!modal.length && (
                <Modal open onCancel={hideModal} cancelText='Закрыть' title={modal} footer={false}>
                    <Table columns={columns} dataSource={userModal()} rowKey='id' />
                </Modal>
            )}

            {modalAI && (
                <Modal open footer={false} onCancel={() => setModalAI(false)}>
                    {isLoadingReport ? (
                        <Flex justify='center'>
                            <Spin size='large' />
                        </Flex>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: report }} />
                    )}
                </Modal>
            )}

            <Flex justify='center' style={{ marginTop: '30px' }}>
                <Flex vertical align='center' gap={20}>
                    <a href={`https://www.instagram.com/${user?.profile_name}/`} target='_blank'>
                        <Typography.Title style={{ textAlign: 'center', margin: 0 }}>{user?.profile_name}</Typography.Title>
                    </a>
                    <Image src={user.profile_picture_url} />

                    <Flex justify='space-between' gap={10}>
                        <Button type='primary' onClick={() => showModal('Подписчики')}>
                            {user?.followers?.length || 0} подписчиков
                        </Button>

                        <Button type='primary' onClick={() => showModal('Подписки')}>
                            {user?.followees?.length || 0} подписок
                        </Button>

                        <Button type='primary' onClick={() => setModalAI(true)}>
                            Отчеты от ИИ
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <Divider />

            {user.posts.length ? (
                <Flex justify='center'>
                    <div className={styles.img_container}>
                        {user.posts.map((item: IUserPost) => {
                            if (item.is_video) {
                                return <video className={styles.img} src={item.video_url} controls></video>
                            }
                            return <GetImg id={item.url}/>
                            // return <img alt='img' className={styles.img} src={`https://1b7b-212-112-118-14.ngrok-free${item.url}`} />
                        })}
                    </div>
                </Flex>
            ) : (
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Нет поста
                </Typography.Title>
            )}
        </>
    )
}
