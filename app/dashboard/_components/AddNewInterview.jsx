"use client"
import React,{useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse,setJsonResponse] = useState();
    const router=useRouter();
    const {user}=useUser();
    const onSubmit = async(e) => {
      setLoading(true);
        e.preventDefault()
        console.log(jobPosition,jobDescription,jobExperience);

        const InputPrompt = "job Position :"+jobPosition+" ,job description:"+jobDescription+", years of experience :"+jobExperience+" . Please create a mock interview according to the following information provided. create 5 question along with answers in JSON format in two fields named -question- and -answer-.";
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(MockJsonResp);
        setJsonResponse(MockJsonResp);

if (MockJsonResp){
const resp=await db.insert(MockInterview).values({
   mockId:uuidv4(),
   jsonMockResp:MockJsonResp,
   jobPosition:jobPosition,
   jobDescription:jobDescription,
   jobExperience:jobExperience,
   createdBy:user?.primaryEmailAddress?.emailAddress,
   createdAt:moment().format('YYYY-MM-DD HH:mm:ss')
}).returning({mockId:MockInterview.mockId});
console.log("Inserted Id",resp)
if(resp){
  setOpenDialog(false);
  router.push('/dashboard/interview/'+resp[0]?.mockId)
}
}
else{
  console.log("Error");
}
        setLoading(false);
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        
          <DialogContent className="max-w-2xl"> 
             <DialogHeader>
                <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                    <DialogDescription asChild>
                        <form onSubmit={onSubmit}>
                         <div>
        
                             <h2>Add Details about your job Position/Role</h2>
                                <div className='mt-7 my-3'>
                                  <label>Job Role/Position name</label>
                                     <Input placeholder="Ex. Software Engineer" required
                                      onChange={(event) => setJobPosition(event.target.value)}
                                      />
                                 </div>
                                <div className='my-3'>
                                  <label>Job Description/Tech Stack</label>
                                   <Textarea placeholder="Ex. React, Node.js, MongoDB etc.." required
                                    onChange={(event) => setJobDescription(event.target.value)}/>
                                </div>
                                <div className='my-3'>
                                <label>Years of Experience</label>
                                <Input placeholder="Ex. 4-5" type="number" max="100" required
                                onChange={(event) => setJobExperience(event.target.value)}/>
                                </div>
                          </div>
       <div className='flex gap-5 justify-end'>
        <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button type='submit' disabled={loading}>{loading ?<><LoaderCircle className='animate-spin'/>Generating...</>: 'Start Interview' 
        }</Button>
      </div>
    </form>
      </DialogDescription>
      
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview