import {FC} from 'react';
import {AuthProvider} from '@/app/providers';
import {Routing} from '@/pages';
import './style/index.css';
import {AntdProvider} from '@/app/providers/antd-provider';

export const App: FC = () => {
    return (
        <AuthProvider>
            <AntdProvider>
                <Routing />
            </AntdProvider>
        </AuthProvider>
    );
};
