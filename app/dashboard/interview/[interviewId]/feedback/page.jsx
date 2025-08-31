"use client"
import React, { useState } from 'react'
import {db} from "@/utils/db"
import { useEffect } from 'react'
import { eq } from 'drizzle-orm'
import { UserAnswer } from '@/utils/schema'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'

function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [overallRating, setOverallRating] = useState(0);
    
    useEffect(() => {
        GetFeedback();   
    }, [])
    
    const GetFeedback = async() => {
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
        
        console.log(result);
        setFeedbackList(result);
        
        // Calculate overall rating
        if (result.length > 0) {
            const totalRating = result.reduce((sum, item) => sum + parseFloat(item.rating || 0), 0);
            const avgRating = (totalRating / result.length).toFixed(1);
            setOverallRating(avgRating);
        }
    }
    
    return (
        <div className='p-10'> 
            <h2 className='font-bold text-3xl text-green-400'>Congratulations!!</h2>
            <h2 className='text-2xl mb-4'>You have completed the Interview. Here is your feedback</h2>
            <h2 className='text-lg my-3'>Your overall rating is: <strong>{overallRating}/5</strong></h2>
            <h2 className='text-sm text-gray-500 mb-6'>Find below correct answer and feedback for improvement</h2>
            
            {feedbackList && feedbackList.map((item, index) => (
                <Collapsible key={index} className="mb-4">
                    <CollapsibleTrigger className='p-4 w-full
                        bg-secondary rounded-lg flex justify-between
                        items-center text-left gap-4 hover:bg-gray-100
                        transition-colors duration-200'>
                        <span className='font-medium'>
                            Question {index + 1}: {item.question}
                        </span>
                        <ChevronsUpDown className='h-5 w-5 flex-shrink-0'/>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className='px-4 pb-4'>
                        <div className='space-y-4 mt-4'>
                            {/* Rating */}
                            <div className='p-3 bg-blue-50 rounded-lg'>
                                <h3 className='font-semibold text-blue-800'>Rating:</h3>
                                <p className='text-blue-700'>⭐ {item.rating}/5</p>
                            </div>
                            
                            {/* Your Answer */}
                            <div className='p-3 bg-gray-50 rounded-lg'>
                                <h3 className='font-semibold text-gray-800'>Your Answer:</h3>
                                <p className='text-gray-700 mt-2'>{item.userAns || 'No answer provided'}</p>
                            </div>
                            
                            {/* Feedback */}
                            <div className='p-3 bg-yellow-50 rounded-lg'>
                                <h3 className='font-semibold text-yellow-800'>Feedback:</h3>
                                <p className='text-yellow-700 mt-2'>{item.feedback || 'No feedback available'}</p>
                            </div>
                            
                            {/* Correct Answer */}
                            <div className='p-3 bg-green-50 rounded-lg'>
                                <h3 className='font-semibold text-green-800'>Model Answer:</h3>
                                <p className='text-green-700 mt-2'>{item.correctAns || 'No model answer available'}</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}
            
            {feedbackList.length === 0 && (
                <div className='text-center py-8'>
                    <p className='text-gray-500'>No feedback available yet. Please complete the interview first.</p>
                </div>
            )}
        </div>
    )
}

export default Feedback