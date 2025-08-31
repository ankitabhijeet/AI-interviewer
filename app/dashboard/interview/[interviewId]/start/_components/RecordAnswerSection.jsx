"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { useEffect, useState, useCallback, useRef } from 'react'
import { Mic, StopCircle } from 'lucide-react'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData, onRecordingStateChange}) {
    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const processingRef = useRef(false); // Prevent double processing
    
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true, // Changed to true for better stability
        useLegacyResults: false,
    });

    // Track processed results to avoid duplication
    const [processedResultsCount, setProcessedResultsCount] = useState(0);
    
    // Handle speech results with proper cleanup
    useEffect(() => {
        if (results && results.length > processedResultsCount) {
            // Only process new results
            const newResults = results.slice(processedResultsCount);
            const newTranscript = newResults.map(result => result?.transcript || '').join(' ');
            
            if (newTranscript.trim()) {
                setUserAnswer(prev => {
                    const combined = prev + (prev ? ' ' : '') + newTranscript;
                    return combined.trim();
                });
            }
            
            setProcessedResultsCount(results.length);
        }
    }, [results, processedResultsCount]);

    // Handle answer processing when recording stops
    useEffect(() => {
        if (!isRecording && userAnswer.trim() && !processingRef.current) {
            const timer = setTimeout(() => {
                UpdateUserAnswer();
            }, 1000); // Small delay to ensure recording is fully stopped
            
            return () => clearTimeout(timer);
        }
    }, [isRecording, userAnswer]);

    // Handle speech recognition errors
    useEffect(() => {
        if (error) {
            console.error('Speech recognition error:', error);
            // Reset the recording state if there's an error
            if (isRecording) {
                stopSpeechToText();
            }
        }
    }, [error, isRecording, stopSpeechToText]);
    // Notify parent component when recording state changes
useEffect(() => {
  if (onRecordingStateChange) {
    onRecordingStateChange(isRecording);
  }
}, [isRecording, onRecordingStateChange]);

    const StartStopRecording = useCallback(async () => {
        try {
            if (isRecording) {
                stopSpeechToText();
            } else {
                // Clear previous results before starting new recording
                setResults([]);
                setUserAnswer('');
                setProcessedResultsCount(0);
                processingRef.current = false;
                
                // Request microphone permission explicitly
                const permission = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (permission) {
                    startSpeechToText();
                }
            }
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Please allow microphone access to record your answer.');
        }
    }, [isRecording, startSpeechToText, stopSpeechToText, setResults]);

    const UpdateUserAnswer = useCallback(async () => {
        if (processingRef.current || !userAnswer.trim()) {
            return;
        }
        
        processingRef.current = true;
        console.log('Processing answer:', userAnswer);
        setLoading(true);
        
        try {
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;
            
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
            console.log('AI Response:', mockJsonResp);
            
            const JsonFeedbackResp = JSON.parse(mockJsonResp);
            
            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('YYYY-MM-DD'),
            });
            
            if (resp) {
                console.log("User Answer Updated Successfully");
                // Clear states after successful save
                setUserAnswer('');
                setResults([]);
                setProcessedResultsCount(0);
            }
        } catch (error) {
            console.error('Error processing answer:', error);
            alert('Failed to save your answer. Please try again.');
        } finally {
            setLoading(false);
            processingRef.current = false;
        }
    }, [userAnswer, mockInterviewQuestion, activeQuestionIndex, interviewData, user, setResults]);

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center bg-black rounded-lg items-center'>
                <Image 
                    src={'/webcam.png'} 
                    width={200} 
                    height={200} 
                    alt='webcam'
                    className='absolute'
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            
            {/* Show current transcript while recording */}
            {isRecording && (
                <div className='mt-4 p-4 bg-gray-100 rounded-lg max-w-md'>
                    <p className='text-sm text-gray-600'>Recording...</p>
                    {interimResult && (
                        <p className='text-sm italic'>{interimResult}</p>
                    )}
                </div>
            )}
            
            {/* Show user answer preview */}
            {userAnswer && (
                <div className='mt-4 p-4 bg-blue-50 rounded-lg max-w-md'>
                    <p className='text-sm font-medium'>Your Answer:</p>
                    <p className='text-sm'>{userAnswer}</p>
                </div>
            )}
            
            <Button
                disabled={loading}
                variant="outline" 
                className="my-10"
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <h2 className='text-red-500 animate-pulse flex gap-2 items-center'>
                        <StopCircle/>Stop Recording
                    </h2>
                ) : (
                    <h2 className='text-blue-500 flex gap-2 items-center'>
                        <Mic/> Record Answer
                    </h2>
                )}
            </Button>
            
            {loading && (
                <p className='text-sm text-gray-500'>Processing your answer...</p>
            )}
            
            {error && (
                <p className='text-sm text-red-500 mt-2'>
                    Speech recognition error. Please try again.
                </p>
            )}
        </div>
    );
}

export default RecordAnswerSection;