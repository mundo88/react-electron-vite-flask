import React, { useEffect, useState } from 'react'
import { IconGardenCart, IconLayoutGrid, IconListDetails, IconPlus } from '@tabler/icons-react';
import LogoSvg from "../assets/images/google-icon.svg"
import { NavLink } from "react-router-dom";

function SideBarItem({icon,path}) {
  return (
    <NavLink to={path} className='my-2 w-12 h-12 flex flex-row items-center justify-center text-gray-800 hover:text-sky-500 duration-300 [&.active]:text-sky-600'>
        {icon}
    </NavLink>
  )
}

export default function SideBar() {
  
  const sideBarItems = [
    {
      path : "/",
      icon : <img className='w-6 h-6' src={LogoSvg}/>
    },
    {
      path : "/tasks",
      icon : <IconListDetails/>
    },
    {
      path : "/tasks/create",
      icon : <IconPlus/>
    },
    {
      path : "/menu",
      icon : <IconLayoutGrid/>
    },
    {
      path : "/marketplace",
      icon : <IconGardenCart/>
    },
  ]
  return (
    <div className='py-6 border-r w-fit h-screen'>
        {
          sideBarItems.map((item,index)=>(
            <SideBarItem icon={item.icon} key={index} path={item.path}/>
          ))
        }
    </div>
  )
}
