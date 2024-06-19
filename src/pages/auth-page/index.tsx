import {FC, useContext} from "react"
import {Button, Card, Flex, Form, Input, Layout, Typography} from "antd"
import {AuthContext} from "@/app/providers"
import {NavLink} from "react-router-dom"
import {MAIN_ROUTES} from "@/shared/lib"
import {Controller, useForm} from "react-hook-form"
import {tFormAuth} from "./types.ts"
import {ErrorText} from "@/shared/ui"

export const AuthPage: FC = () => {
    const {login, isLoading, message} = useContext(AuthContext)

    const {
        control,
        handleSubmit,
        formState: {isValid},
    } = useForm<tFormAuth>({
        defaultValues: {
            username: "",
            password: "",
        },
    })

    return (
        <Layout>
            <Flex align='center' justify='center' style={{height: "100vh"}}>
                <Card style={{width: 500}}>
                    <Form layout='vertical'>
                        <Form.Item>
                            <Typography.Title style={{textAlign: "center"}}>Авторизация</Typography.Title>
                        </Form.Item>

                        <Form.Item label='Логин'>
                            <Controller
                                rules={{required: true}}
                                control={control}
                                render={({field}) => <Input {...field} size='large' placeholder='Логин' />}
                                name='username'
                            />
                        </Form.Item>

                        <Form.Item label='Пароль'>
                            <Controller
                                rules={{required: true}}
                                control={control}
                                render={({field}) => (
                                    <Input.Password {...field} autoComplete='new-password' size='large' placeholder='Пароль' />
                                )}
                                name='password'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                disabled={!isValid}
                                loading={isLoading}
                                onClick={handleSubmit(login)}
                                size='large'
                                htmlType='submit'
                                type='primary'
                                style={{width: "100%"}}>
                                Вход
                            </Button>
                            <ErrorText style={{textAlign: "center"}}>{message}</ErrorText>
                        </Form.Item>

                        <Form.Item style={{textAlign: "center"}}>
                            <Typography.Text>Нет аккаунта?</Typography.Text> <NavLink to={MAIN_ROUTES.register}>Зарегистроваться</NavLink>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </Layout>
    )
}
