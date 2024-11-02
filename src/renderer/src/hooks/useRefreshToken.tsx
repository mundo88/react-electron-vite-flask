import { access } from "fs";
import {axiosInstance} from "../services/axiosInstance";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { setAccessToken, setCSRFToken } = useAuth()
    const refresh = async () => {
        const response = await axiosInstance.post('/refresh-token')
        const token = response?.data?.access
        const csrfToken = response?.headers["x-csrftoken"]
        setAccessToken(token)
        setCSRFToken(csrfToken)
        return { accessToken: token, csrfToken: csrfToken }
    }
    return refresh
}