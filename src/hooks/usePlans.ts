import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';
import { api, setAuthToken } from '@/lib/axios';


const fetcher = async (url: any) => {
    const token =  Cookies.get('token');

    setAuthToken(token)
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Fetcher error:', error); 
        throw error;
    }
};

export const usePlans = () => {
    const { data, error, isLoading: loading } = useSWR('pool/available-plans/token', fetcher, {
        revalidateIfState: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });


    const handleRevalidate = () => {
        mutate(`pool/available-plans/token`);
    };

    return {
        loading,
        data,
        error,
        revalidate: handleRevalidate,
    };
};