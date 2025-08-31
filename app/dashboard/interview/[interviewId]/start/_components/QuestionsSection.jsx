import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'


function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Text To Speech Not Supported');
    }
  }
  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-8'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
       
        { mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
          <h2 
           key={index} 
           className={`p-2 bg-secondary rounded-full 
            text-xs text-center cursor-pointer
                ${activeQuestionIndex == index&&'bg-blue-300 text-blue-500'}`}>Question #{index + 1}</h2>
        ))}
       
      </div>
       <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
       <Volume2  className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/> 
       <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500'>
          <Lightbulb/>
          <strong>NOTE:</strong>
        </h2>
        <h2 className='text-sm text-blue-500 my-2'>Click on Record Answer when you want to answer the question .At the end of the interview we will give you the feedback along with correct answer for each of the question and your answer to compare it.</h2>
       </div>
    </div>
  )
}

export default QuestionsSection