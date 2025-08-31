"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mic, Brain, Video, FileText, BarChart3, Play, Users, Clock, Star } from 'lucide-react';

export default function HowItWorks() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  const steps = [
    {
      number: "01",
      icon: <FileText className="w-8 h-8" />,
      title: "Choose Your Interview Type",
      description: "Select from various job roles and industries. Our AI generates relevant questions based on your chosen field.",
      detail: "Whether you're preparing for tech, finance, marketing, or any other field, we have tailored questions ready for you."
    },
    {
      number: "02",
      icon: <Video className="w-8 h-8" />,
      title: "Start Your Mock Interview",
      description: "Face our AI interviewer in a realistic video call environment. Answer questions naturally using voice recognition.",
      detail: "Experience real interview conditions with webcam recording and professional question delivery."
    },
    {
      number: "03",
      icon: <Mic className="w-8 h-8" />,
      title: "Record Your Responses",
      description: "Speak your answers naturally. Our advanced speech-to-text technology captures every word accurately.",
      detail: "No need to type - just speak naturally as you would in a real interview. Our AI understands context and nuance."
    },
    {
      number: "04",
      icon: <Brain className="w-8 h-8" />,
      title: "Get AI-Powered Analysis",
      description: "Receive detailed feedback on your answers, including content quality, delivery, and areas for improvement.",
      detail: "Our AI analyzes your responses against best practices and provides actionable insights to help you improve."
    },
    {
      number: "05",
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your improvement over time with detailed analytics and performance metrics.",
      detail: "See how your interview skills develop with each practice session and identify your strongest areas."
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Users Trained" },
    { icon: <Clock className="w-6 h-6" />, value: "50K+", label: "Interviews Completed" },
    { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "User Rating" },
    { icon: <BarChart3 className="w-6 h-6" />, value: "85%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-6">
            
            <button
              onClick={handleGetStarted}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium "
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master interview skills in 5 simple steps. Our AI-powered platform guides you through 
            a realistic interview experience with personalized feedback.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
                    <span className="text-3xl font-bold text-gray-300">{step.number}</span>
                    <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-center w-16 h-16 bg-black rounded-xl mx-auto mb-4">
                        {React.cloneElement(step.icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div className="text-center">
                        <div className="h-2 bg-gray-200 rounded-full mb-3">
                          <div 
                            className="h-2 bg-black rounded-full transition-all duration-1000"
                            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">Step {index + 1} of {steps.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      

      {/* Final CTA */}
      <section className="py-20 bg-white text-Black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey to interview success today
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gray-200 text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg flex items-center gap-2 mx-auto group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

     
    </div>
  );
}