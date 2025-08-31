"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React,{ useEffect , useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import dynamic from "next/dynamic";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";


const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false } 
);


function StartInterview ({params}) {
    const router = useRouter();
  const { interviewId } = React.use(params);
  const[interviewData,setInterviewData]=useState();
  const[mockInterviewQuestion,setMockInterviewQuestion]=useState([]);
  const[activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  const[isRecording,setIsRecording]=useState(false); // Added this line
  
  useEffect(() => {
    GetInterviewDetails();
  },[]);
   /**
     * used to Get interview details by MockId/Interview Id
     */
    const GetInterviewDetails=async()=>{
      
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
       
       const jsonMockResp=JSON.parse(result[0].jsonMockResp)
       console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        console.log(interviewId);
        
    }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
{/*Questions*/}
<QuestionsSection 
mockInterviewQuestion={mockInterviewQuestion}
activeQuestionIndex={activeQuestionIndex}
isRecording={isRecording}
/>

{/*Video /Audio Recording*/}
<RecordAnswerSection
mockInterviewQuestion={mockInterviewQuestion}
activeQuestionIndex={activeQuestionIndex}
interviewData={interviewData}
onRecordingStateChange={setIsRecording}
/>

      </div>
      <div className='flex justify-end gap-6' >
       {activeQuestionIndex>0&& 
       <Button disabled={isRecording} onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous</Button>}
        {activeQuestionIndex<4 && 
        <Button disabled={isRecording} onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next</Button>}
        {activeQuestionIndex == 4 && (
          <Button
            onClick={() =>
              router.push(`/dashboard/interview/${interviewData?.mockId}/feedback`)
            }
            disabled={isRecording}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  )
}

export default StartInterview