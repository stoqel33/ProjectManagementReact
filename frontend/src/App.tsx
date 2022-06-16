import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import i18next from 'i18next';

import { CreateRoutes } from './routes';

export const App = () => {
    useEffect(() => {
        if (!localStorage.getItem('i18nextLng')) {
            i18next.changeLanguage('pl');
        }
    }, []);

    return (
        <Suspense fallback={null}>
            <Router>
                <CreateRoutes />
            </Router>
        </Suspense>
    );
};
