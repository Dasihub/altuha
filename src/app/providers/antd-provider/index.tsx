import {createContext, FC, ReactNode, useState} from 'react';
import {ConfigProvider, theme} from 'antd';

export const AntdContext = createContext<Partial<{changeTheme: (value: boolean) => void; isTheme: boolean}>>({});

export const AntdProvider: FC<{children: ReactNode}> = ({children}) => {
    const [isTheme, setIsTheme] = useState<boolean>(Boolean(localStorage.getItem('theme')) || false);

    const changeTheme = (value: boolean) => {
        setIsTheme(value);
        localStorage.setItem('theme', String(value));
    };

    return (
        <ConfigProvider theme={{algorithm: isTheme ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
            <AntdContext.Provider value={{changeTheme, isTheme}}>{children}</AntdContext.Provider>
        </ConfigProvider>
    );
};
