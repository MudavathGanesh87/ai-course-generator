"use client"
import React from 'react'
import Image from 'next/image'
import { GrHomeRounded } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { RiStackLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { useContext } from 'react';
import { UserCourseListContext } from '../../_context/UserCourseListContext';


function SideBar() {
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
    const Menu=[
        {
            id:1,
            name: 'Home',
            icon:<GrHomeRounded />,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'Explore',
            icon: <RiStackLine />,
            path: '/dashboard/explore'
        },
        {
            id:3,
            name: 'Settings',
            icon: <CiSettings />,
            path: '/dashboard/settings'
        }
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
      <Image src={'/logo.png'} alt="Logo" width={150} height={50} className='mb-5' />
      <hr className='my-5' />
      <ul>
        {Menu.map((item,index)=> (
            <Link key={index} href={item.path}>
              <div className={`flex items-center gap-2 text-white p-2 rounded-md mb-2 hover:bg-gray-700 cursor-pointer ${path===item.path ? 'bg-gray-700' : ''}`}>
                  <div className='text-3xl'>{item.icon}</div>
                  <h2>{item.name}</h2>
              </div>
            </Link>
        ))}
      </ul>

      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList.length / 5) * 100} />
        <h2 className='text-sm my-2'>{userCourseList.length} out of 5 courses created</h2>
        <h2 className='text-xs text-gray-500'>upgrade your plan for unlimited course creation</h2>
      </div>
    </div>
  )
}

export default SideBar
