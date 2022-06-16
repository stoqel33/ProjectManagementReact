import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

export const useAxios = (axiosParams: AxiosRequestConfig) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    };

    useEffect(() => {
        (async () => {
            try {
                const response: AxiosResponse = await axios.request({
                    signal: controllerRef.current.signal,
                    ...axiosParams,
                });
                setData(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoaded(true);
            }
        })();

        return () => cancel();
    }, []);

    return {
        data,
        error,
        loaded,
    };
};
