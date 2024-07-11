import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';
import { api, setAuthToken } from '@/lib/axios';
import {  useState } from 'react';
import { useAppSelector } from '@/redux/hook';


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

export const usePoolSimple: any = () => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(30);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { did } = useAppSelector(state => state.contract.selectSimpleStake)
    const { data: pooldata, error, isLoading: loadingPool } = useSWR(`pool?page=${currentPage}&perPage=${itemsPerPage}&poolId=${did ? did : 0}`, fetcher, {
        revalidateIfState: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,

    });
    
   
    const handleRevalidate = () => {
        mutate(`pool?page=${currentPage}&perPage=${itemsPerPage}&poolId=${did ? did : 0}`);
    };

    return {
        loadingPool,
        pooldata,
        error,
        handleRevalidate,
        setItemsPerPage,
        setCurrentPage,
        currentPage,
        itemsPerPage
    };
};