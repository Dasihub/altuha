import {FC} from 'react';
import {Menu} from 'antd';
import {items} from './consts.tsx';
import {useLocation} from 'react-router-dom';

export const Navigation: FC = () => {
    const location = useLocation();

    return <Menu mode='inline' style={{marginTop: 20}} items={items} selectedKeys={[location.pathname]} />;
};
