import {FC} from "react"
import {Button, Flex, Layout, Typography} from "antd"
import {NavLink} from "react-router-dom"
import {MAIN_ROUTES} from "@/shared/lib"

export const NotPage: FC = () => {
    return (
        <Layout>
            <Flex style={{height: "100vh"}} align='center' justify='center' vertical gap={10}>
                <Typography.Title style={{margin: 0}}>404</Typography.Title>
                <Typography.Title style={{margin: 0}}>Страница не найдено</Typography.Title>

                <NavLink to={MAIN_ROUTES.main}>
                    <Button type='primary' size='large'>
                        Перейти на главную страницу
                    </Button>
                </NavLink>
            </Flex>
        </Layout>
    )
}
