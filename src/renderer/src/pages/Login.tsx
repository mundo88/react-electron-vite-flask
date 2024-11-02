import { MdEmail, MdPassword } from 'react-icons/md';
import { toast } from 'react-toastify';
import { axiosInstance } from '../services/axiosInstance';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { setAccessToken, setCSRFToken,setRefreshToken } = useAuth()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, headers } = await axiosInstance.post("login", {
                email: email,
                password: password
            })
            toast.success(`Đăng nhập thành công`)
            setAccessToken && setAccessToken(data?.accessToken)
            setRefreshToken(data?.refreshToken)
            setCSRFToken(headers["x-csrftoken"])
            navigate("/")
        }catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-16 bg-white rounded-md shadow-sm'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl text-gray-800 font-bold mb-2'>Đăng Nhập</h1>
                <p className='text-gray-500'>Chưa có tài khoản? <a href="/register" className='hover:text-sky-500 duration-150 hover:underline'>Đăng ký ngay</a></p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='relative mb-6'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className='peer h-12 pl-12 w-96 rounded-md border border-gray-300 pr-4 duration-150 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-800' placeholder='Tên đăng nhập' />
                    <span className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-sky-500 duration-150'>
                        <MdEmail size={20}></MdEmail>
                    </span>
                </div>
                <div className='relative mb-6'>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className='peer h-12 pl-12 w-96 rounded-md border border-gray-300 pr-4 duration-150 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-800' placeholder='Tên đăng nhập' />
                    <span className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-sky-500 duration-150'>
                        <MdPassword size={20}></MdPassword>
                    </span>
                </div>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-2'>
                        <input checked={remember} onChange={(e) => setRemember(e.target.checked)} type="checkbox" id='remember' className='peer w-4 h-4 rounded-md border border-gray-300 text-sky-500 duration-150 focus:ring-4 focus:ring-sky-100' />
                        <label htmlFor="remember" className='text-gray-500 peer-checked:text-gray-500'>
                            <span>Lưu thông tin</span>
                        </label>
                    </div>
                    <a href="/forgot-password" className='text-gray-500 hover:text-sky-500 duration-150 hover:underline'>Forgot password</a>
                </div>
                <input type="submit" value="Đăng Nhập" className='w-full h-12 bg-sky-500 text-white rounded-md duration-150 hover:bg-sky-600 font-semibold active:scale-95' />
            </form>
        </div>
    );
}

export default Login;
