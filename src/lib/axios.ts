import axios from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-type": "Application/json",
    },
});

export function setAuthToken(token: any) {
    if (token) {
        api.defaults.headers.common.Authorization = `${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}


export { api };
