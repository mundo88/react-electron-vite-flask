import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-100'>
            <img className='h-12 w-auto mb-6' src="https://pngimg.com/d/meta_PNG5.png" alt="" />
            <Outlet/>
            <ToastContainer position="top-center" />
        </div>
    );
}

export default AuthLayout;
