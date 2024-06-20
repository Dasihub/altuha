import { FC, useRef, useState, MouseEvent, ChangeEvent, useContext } from 'react'
import { Button, Divider, Flex, Form, Input, InputRef, notification, Select, Space, Table } from 'antd'
import { getColumn } from './conts.tsx'
import { PlusOutlined } from '@ant-design/icons'
import { useGenerateParser, useUserList } from '@/features/main'
import { AuthContext } from '@/app/providers'

export const Main: FC = () => {
    const columns = getColumn()
    const { token } = useContext(AuthContext)
    const [users, setUsers] = useState<string[]>([])
    const [items, setItems] = useState<string[]>([])
    const [name, setName] = useState<string>('')
    const [values, setValues] = useState<string[]>([])
    const inputRef = useRef<InputRef>(null)

    const { data, isLoading, refetch } = useUserList(token)

    const { mutate, isLoading: isLoadingMutate } = useGenerateParser(token)

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)

    const addItem = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()
        setItems([...items, name])
        setName('')
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    const search = () => {
        if (values.length) {
            return mutate({ users })
        }

        notification.warning({ message: 'Выберите пользователя' })
    }

    return (
        <>
            <Space.Compact>
                <Select
                    size='large'
                    style={{ minWidth: '400px' }}
                    onChange={setUsers}
                    notFoundContent='Пока нет данных'
                    mode='tags'
                    dropdownRender={menu => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Form>
                                <Space.Compact>
                                    <Input ref={inputRef} value={name} onChange={onNameChange} onKeyDown={e => e.stopPropagation()} />
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<PlusOutlined />}
                                        disabled={!name.length}
                                        onClick={addItem}>
                                        Добавить
                                    </Button>
                                </Space.Compact>
                            </Form>
                        </>
                    )}
                    options={items.map(item => ({ label: item, value: item }))}
                />
                <Button type='primary' size='large' onClick={search} loading={isLoadingMutate}>
                    Поиск
                </Button>
            </Space.Compact>

            <Divider />

            <Flex justify='flex-end'>
                <Button onClick={() => refetch()} loading={isLoading}>
                    Обновить
                </Button>
            </Flex>

            <Table loading={isLoading} style={{ marginTop: 20 }} dataSource={data || []} columns={columns} rowKey='id' />
        </>
    )
}
