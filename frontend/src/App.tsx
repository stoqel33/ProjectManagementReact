import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import i18next from 'i18next';

import { Home } from 'pages/home';

export const App = () => {
    useEffect(() => {
        if (!localStorage.getItem('i18nextLng')) {
            i18next.changeLanguage('pl');
        }
    }, []);

    return (
        <Suspense fallback={null}>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </Suspense>
    );
};
