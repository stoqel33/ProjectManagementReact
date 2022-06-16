import * as Page from 'pages';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const PageLayout = ({ children }) => <Outlet />;

const PrivateRoute = () => {
    const auth = useSelector((store: any) => store.auth);
    return auth.isAuthenticated ? (
        <PageLayout>
            <Outlet />
        </PageLayout>
    ) : (
        <Navigate to="/" />
    );
};

export const CreateRoutes = () => {
    const routes = useRoutes([
        {
            element: <PrivateRoute />,
            children: [
                {
                    path: '/dashboard',
                    element: <Page.Dashboard />,
                },
            ],
        },
        {
            index: true,
            path: '/',
            element: <Page.SignIn />,
        },
        {
            path: '/404',
            element: <Page.NotFound />,
        },
        {
            path: '*',
            element: <Navigate to="/404" />,
        },
    ]);

    return routes;
};
