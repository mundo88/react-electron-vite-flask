import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken' 
import useAuth from '../hooks/useAuth' 

export default function PersistLogin() {
    const refresh = useRefreshToken()
    const { accessToken} = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        async function verifyUser() {
            try {
                await refresh()
                setLoading(true)
            } catch (error) {
                console.log(error?.response)
            } finally {
                isMounted && setLoading(false)
            }
        }
        !accessToken ? verifyUser() : setLoading(false)
        return () => {
            isMounted = false
        }
    }, [])

    return (
        loading ? <div className='h-screen w-screen flex items-center justify-center flex-col'>
            <h1 className='text-sky-500 font-black text-8xl animate-pulse'>META</h1>
        </div> : <Outlet />
    )
}
