import { FC } from 'react'
import { Button, Card, Flex, Form, Input, Layout, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { MAIN_ROUTES } from '@/shared/lib'
import { Controller, useForm } from 'react-hook-form'
import { tFormRegister } from '@/features/register'
import { ErrorText } from '@/shared/ui'
import { useRegister } from '@/features/register/queries'

export const Register: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<tFormRegister>({
        defaultValues: {
            login: '',
            email: '',
            password: '',
        },
    })

    const { mutate, isLoading } = useRegister()

    const submit = (data: tFormRegister) => mutate(data)

    return (
        <Layout>
            <Flex align='center' justify='center' style={{ height: '100vh' }}>
                <Card style={{ width: 500 }}>
                    <Form layout='vertical'>
                        <Form.Item>
                            <Typography.Title style={{ textAlign: 'center' }}>Регистрация</Typography.Title>
                        </Form.Item>

                        <Form.Item label='Логин'>
                            <Controller
                                rules={{
                                    required: {
                                        message: 'Заполните обязательное поле',
                                        value: true,
                                    },
                                }}
                                control={control}
                                render={({ field }) => <Input {...field} size='large' />}
                                name='login'
                            />
                            {errors.login && <ErrorText>{errors.login.message}</ErrorText>}
                        </Form.Item>

                        <Form.Item label='Email'>
                            <Controller
                                rules={{
                                    required: {
                                        message: 'Заполните обязательное поле',
                                        value: true,
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Введите корректный email',
                                    },
                                    validate: value => {
                                        if (/[,|$|()|{}|\[\]]/.test(value)) {
                                            return 'Введите корректный email'
                                        }
                                        return true
                                    },
                                }}
                                control={control}
                                render={({ field }) => <Input {...field} size='large' />}
                                name='email'
                            />
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </Form.Item>

                        <Form.Item label='Пароль'>
                            <Controller
                                rules={{
                                    required: {
                                        message: 'Заполните обязательное поле',
                                        value: true,
                                    },
                                }}
                                control={control}
                                render={({ field }) => (
                                    <Input.Password {...field} autoComplete='new-password' size='large' placeholder='Пароль' />
                                )}
                                name='password'
                            />
                            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={isLoading}
                                onClick={handleSubmit(submit)}
                                size='large'
                                type='primary'
                                htmlType='submit'
                                style={{ width: '100%' }}>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Typography.Text>Есть аккаунт?</Typography.Text> <NavLink to={MAIN_ROUTES.auth}>Авторизоваться</NavLink>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </Layout>
    )
}
