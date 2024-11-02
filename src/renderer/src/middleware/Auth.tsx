import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import { Navigate, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"

export default function AuthMiddleware() {
    const { accessToken } = useAuth()
    const location = useLocation()
    return (accessToken ? <Outlet /> : <Navigate to={"/login?next="+location.pathname} state={{ from: location }} replace />)

}

function AnonymousMiddleware() {
    const { accessToken } = useAuth()
    const [nextParams] = useSearchParams();
    const nextLocation = nextParams.get('next')||'/' 
    const navigate  = useNavigate();
    useEffect(() => {
        navigate(nextLocation, { replace: true })
    }, [accessToken])
    return (
        <Outlet />
    )
} 
export {
    AnonymousMiddleware,
    AuthMiddleware
}