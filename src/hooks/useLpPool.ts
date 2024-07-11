
import React, { useState, useEffect } from "react";
import useSWR , { mutate } from 'swr';
import Cookies from 'js-cookie';
import { api, setAuthToken } from '@/lib/axios';





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

export const useLpToken = () => {

    const { data, error , isLoading : isLoadingMyStack } = useSWR('pool/lp', fetcher, {
        revalidateIfState: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
   


    const handleRevalidate = () => {
        mutate(`pool/lp`)
    };

   

    return {
        isLoadingMyStack,
        data,
        error,
        revalidate: handleRevalidate,
    };
};