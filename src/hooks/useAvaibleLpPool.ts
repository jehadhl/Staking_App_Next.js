
import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';
import { api } from '@/lib/axios';




const fetcher = async (url: any) => {
    const token = Cookies.get('token');
    
    try {
        const response = await api.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetcher error:', error); 
        throw error;
    }
};


export const useAvaibleLpPool = () => {
    const { data: poolAvailableData, error, isLoading } = useSWR('pool/available-plans/lp', fetcher, {
        revalidateIfState: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });


 


    const handleRevalidate = () => {
        mutate(`pool/available-plans/lp`)
    };

    return {
        isLoading,
        poolAvailableData,
        error,
        handleRevalidate,
    };
};