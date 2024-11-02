import { useState } from 'react'
import {  MdEmail, MdLock, MdPassword } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../services/axiosInstance'


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp', {
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
            return;
        }
        axiosInstance.post("register",{
            email:email,
            password:password
        }).then(res=>{      
            navigate('/login')
            toast.success('Đăng ký thành công, đăng nhập ngay');
        }).catch(err=>{
            console.log(err)
            toast.error(err.response.data.email[0]);
        })
    }
    return (
        <div className='p-16 bg-white rounded-md shadow-sm'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl text-gray-800 font-bold mb-2'>Đăng Ký</h1>
                <p className='text-gray-500'>Đã có tài khoản? <a href="/login" className='hover:text-sky-500 duration-150 hover:underline'>Đăng nhập ngay</a></p>
            </div>
            <form  onSubmit={handleSubmit}>
                <div className='relative mb-6'>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" name='username' id='username' className='peer h-12 pl-12 w-96 rounded-md border border-gray-300 pr-4 duration-150 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-800' placeholder='Tên đăng nhập' />
                    <span className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-sky-500 duration-150'>
                        <MdEmail size={20}></MdEmail>
                    </span>
                </div>
                <div className='relative mb-6'>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" id='password' name='password' className='peer h-12 pl-12 w-96 rounded-md border border-gray-300 pr-4 duration-150 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-800' placeholder='Mật khẩu' />
                    <span className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-sky-500 duration-150'>
                        <MdLock size={20}></MdLock>
                    </span>
                </div>
               
                <div className='relative mb-6'>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id='-re-password' name='re-password' className='peer h-12 pl-12 w-96 rounded-md border border-gray-300 pr-4 duration-150 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-800' placeholder='Nhập lại mật khẩu' />
                    <span className='absolute top-0 left-4 h-full flex items-center justify-center text-gray-500 peer-focus:text-sky-500 duration-150'>
                        <MdPassword size={20}></MdPassword>
                    </span>
                </div>
               
                <input type="submit" value="Đăng Ký" className='w-full h-12 bg-sky-500 text-white rounded-md duration-150 hover:bg-sky-600 font-semibold active:scale-95' />
            </form>
        </div>
    );
}

export default Register;
