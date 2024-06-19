import {FC, useContext} from 'react';
import {BaseLayout} from '@/widgets/ui';
import {Form, Switch} from 'antd';
import {AntdContext} from '@/app/providers/antd-provider';

export const SettingPage: FC = () => {
    const {changeTheme, isTheme} = useContext(AntdContext);

    const change = (value: boolean) => changeTheme(value);

    return (
        <BaseLayout>
            <Form layout='vertical'>
                <Form.Item label='Изменить тему приложении'>
                    <Switch checked={isTheme} onChange={change} checkedChildren='🌙' unCheckedChildren='☀️' />
                </Form.Item>
            </Form>
        </BaseLayout>
    );
};
