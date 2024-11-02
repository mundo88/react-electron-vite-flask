import useAuth from '@renderer/hooks/useAuth';

const Nav = () => {
    const { currentUser } = useAuth()
    return (
        <nav className='flex items-center justify-between p-4 border-b'>
            <div className='flex items-center gap-24'>
                <h1 className='text-gray-800 font-bold text-2xl'>App Editor</h1>
                <p className='text-sm text-gray-800'>Version <span className='text-green-600'>3.6.3</span> is availaible - <span className='text-green-600'>Update now?</span></p>
            </div>
            <div className='flex items-center gap-2'>
                <p>{currentUser.email}</p>
                <img src={currentUser.profile_picture} className='h-10 w-10 object-cover rounded-full border' alt="" />
            </div>
        </nav>
    )
}

export default Nav;
