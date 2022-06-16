import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login, register } from 'reduxStore/auth/authSlice';

export const SignIn = () => {
    const { t } = useTranslation(['common']);
    const { isAuthenticated } = useSelector((store: any) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<any>({});

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated]);

    const handleChange = ({ target: { value, name } }: any) => {
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(data));
    };
    const handleSubmitLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(data));
    };

    return (
        <>
            <h1>{t('Hello world')}</h1>
            <h1>register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                />
                <button type="submit">register</button>
            </form>
            <h1>login</h1>
            <form onSubmit={handleSubmitLogin}>
                <input
                    type="text"
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                />
                <button type="submit">login</button>
            </form>
        </>
    );
};
