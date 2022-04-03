import React from 'react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const { t } = useTranslation(['common']);

    return <h1>{t('Hello world')}</h1>;
};
