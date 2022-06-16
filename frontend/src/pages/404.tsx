import { useTranslation } from 'react-i18next';

export const NotFound = () => {
    const { t } = useTranslation(['common']);

    return <h1>{t('Page not found')}</h1>;
};
