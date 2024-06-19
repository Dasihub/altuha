import {FC} from 'react';
import {BaseLayout} from '@/widgets/ui';
import {Main} from '@/features/main';

export const MainPage: FC = () => {
    return (
        <BaseLayout>
            <Main />
        </BaseLayout>
    );
};
