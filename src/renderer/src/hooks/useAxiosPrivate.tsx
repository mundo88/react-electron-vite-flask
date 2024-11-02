/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import {axiosServerInstance } from '@renderer/services/axiosInstance';

export default function useAxiosPrivate() {
    const { accessToken, setAccessToken, csrftoken } = useAuth()

    const refresh = useRefreshToken()
    useEffect(() => {

        const requestIntercept = axiosServerInstance.interceptors.request.use(
            (config) => {

                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrftoken
                }
                return config
            },
            (error) => Promise.reject(error)
        )
        const responseIntercept = axiosServerInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    setAccessToken && setAccessToken(newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken;
                    return axiosServerInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosServerInstance.interceptors.request.eject(requestIntercept)
            axiosServerInstance.interceptors.response.eject(responseIntercept)
        }
    }, [accessToken])

    return { axiosServerInstance }
}