import Nav from '@renderer/components/Nav';
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
export default function Layout() {
  
  return (
    <div className='flex flex-row h-screen overflow-hidden'>
        <SideBar/>
        <div className='w-full flex flex-col'>
            <Nav></Nav>
            <Outlet/>
        </div>
    </div>
  )
}