import { FC, ReactNode, useContext, useState } from 'react'
import { Navigation } from '@/widgets/ui'
import { Button, Flex, Layout, theme, Typography } from 'antd'
import { AuthContext } from '@/app/providers'
import { InstagramOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTES } from '@/shared/lib'
import { parceTokenUtil } from '@/shared/utils'

const { Header, Content, Footer, Sider } = Layout

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const { logout, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const { colorBgContainer, colorBorder, colorPrimary } = theme.useToken().token

    const logoutClick = () => {
        logout()
        navigate(MAIN_ROUTES.auth)
    }

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{ backgroundColor: colorBgContainer, borderRight: `1px solid ${colorBorder}` }}
                    collapsible
                    collapsed={collapsed}
                    width={240}
                    onCollapse={value => setCollapsed(value)}>
                    <Flex justify='center' gap={4} align='center' style={{ marginTop: '10px' }}>
                        <InstagramOutlined style={{ fontSize: 30, color: colorPrimary }} />
                        {!collapsed && (
                            <Typography.Title
                                level={5}
                                style={{ color: colorPrimary, margin: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                Instagram-parsing
                            </Typography.Title>
                        )}
                    </Flex>
                    <Navigation />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '0px 10px',
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography.Title style={{ margin: 0 }}>{parceTokenUtil(token)?.sub}</Typography.Title>

                        <Button type='primary' onClick={logoutClick}>
                            Выйти
                        </Button>
                    </Header>

                    <Content style={{ margin: '16px', height: 'fit-content' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Jogan ©</Footer>
                </Layout>
            </Layout>
        </>
    )
}
