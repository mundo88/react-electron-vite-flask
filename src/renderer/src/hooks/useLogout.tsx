import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"
import useAxiosPrivate from "./useAxiosPrivate"

export default function useLogout() {
    const { setCurrentUser, setAccessToken, setCSRFToken } = useAuth()
    const navigate = useNavigate()

    const {axiosServerInstance} = useAxiosPrivate()
    const logout = async () => {
        try {
            const response = await axiosServerInstance.post("/logout")
            setAccessToken && setAccessToken("")
            setCSRFToken("")
            setCurrentUser(null)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return logout
}