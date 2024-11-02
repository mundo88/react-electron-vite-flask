import { useContext } from 'react'
import AuthContext from '@renderer/context/AuthContext'

export default function useAuth():IAuthContext {
    return useContext(AuthContext)
}