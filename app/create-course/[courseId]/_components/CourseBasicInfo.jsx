"use client";
import React from 'react'
import Image from 'next/image';
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import {Button} from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useState } from 'react';
import { storage } from '@/configs/firebaseConfig';
import { ref } from 'firebase/storage';
import Link from 'next/link';

function CourseBasicInfo({ course ,refreshData,edit=true}) {
  const [selectedFile,setSelectedFile]=useState();
  const onFileSelected=async(event)=>{
    const file=event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName=Date.now()+'.jpg'
    const storageRef=ref(storage,fileName);
    console.log(file);
  }
  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-170'>
        <div>
          <h2 className='font-bold text-2xl'>{course?.courseOutput?.['Course Name'] || course?.name}
             {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}</h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description || course?.description || "No description available."}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center'><IoExtensionPuzzleOutline />{course?.category || "Uncategorized"}</h2>
          {!edit &&<Link href={'/course/'+course?.courseId+'/start'}>
          <Button className='mt-5'>Start</Button>
          </Link>}
        </div>
        <div>
            <label htmlFor='upload-image' className='cursor-pointer'>
            <Image src={selectedFile?selectedFile:'/placeholder.png'} alt="Course Image" width={200} height={200} 
            className='rounded-lg mt-5 md:mt-0 mt-5 cursor-pointer' /></label>
            <input type="file" id="upload-image" className='opacity-0' 
            onChange={onFileSelected}/>
        </div>
      </div> 
    </div>
  );
}


export default CourseBasicInfo
