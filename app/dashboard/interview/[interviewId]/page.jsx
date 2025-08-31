"use client"

import React,{ useEffect } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import { useState } from 'react'
import {  Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button'
import Link from 'next/link'



function Interview({params}) {
    const { interviewId } = React.use(params);
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false)
    
    useEffect(()=>{
        
         console.log(interviewId)
         GetInterviewDetails();
    },[])
    /**
     * used to Get interview details by MockId/Interview Id
     */
    const GetInterviewDetails=async()=>{
      
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
       
        setInterviewData(result[0]);
    }
  return (
    <div className='my-10 '>
        <h2 className='font-light text-4xl'>Let's Get Started</h2>
<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
 
            <div className='flex flex-col my-2 gap-4'>
                <div className='flex flex-col my-5 gap-4 p-5 rounded-md border '>
    <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData?.jobPosition}</h2>
    <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData?.jobDescription}</h2>
    <h2 className='text-lg'><strong>Years of Experience : </strong>{interviewData?.jobExperience}</h2>

</div>
<div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
<h2 className='mt-3 text-yellow-500'>Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview . It Has 5 Questions which you need to answer and at last you will get the report on basis of your answers . NOTE: We never record your video. WebCam access you can disable anytime you want.</h2>
</div>
</div>

 <div>
            {webCamEnabled? <Webcam
            onUserMedia={()=>setWebCamEnabled(true)}
            onUserMediaError={()=>setWebCamEnabled(false)}
            mirrored={true}
            style={{
                height:500,
                width:750,
                
            }}
            />
            :
            <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
            <Button variant='ghost' className='my-3 w-full' onClick={()=>setWebCamEnabled(true)}>Enable WebCam And Microphone</Button>
            </>
            }
            </div>
</div>
      <div className='flex justify-end items-end'>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button >Start Interview</Button>
        </Link>

</div>
    </div>
  )
}
export default Interview