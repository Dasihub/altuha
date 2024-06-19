import {FC} from 'react';
import {BaseLayout} from '@/widgets/ui';
import {Account} from '@/features/acount-info';

export const AccountInfoPage: FC = () => {
    return (
        <BaseLayout>
            <Account />
        </BaseLayout>
    );
};
