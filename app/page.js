"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mic, Brain, Target, CheckCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Recognition",
      description: "Advanced speech-to-text technology captures your responses accurately"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Feedback",
      description: "Get intelligent analysis and personalized improvement suggestions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Practice",
      description: "Practice with industry-specific questions tailored to your field"
    }
  ];

  const benefits = [
    "Realistic interview simulation",
    "Instant feedback and scoring",
    "Improve communication skills",
    "Build confidence",
    "Track your progress"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-6">
           
            <button
              onClick={handleGetStarted}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Master Your
              <span className="block text-gray-600">Interview Skills</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Practice with AI-powered mock interviews. Get real-time feedback, 
              improve your responses, and land your dream job with confidence.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold text-lg flex items-center gap-2 mx-auto group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose InterviewAI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology provides personalized interview practice 
              that adapts to your needs and helps you succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                Transform Your Interview Performance
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Practice makes perfect. Our AI-powered platform helps you identify 
                areas for improvement and builds the confidence you need to excel 
                in any interview situation.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black rounded-2xl p-8 lg:p-12">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our AI analyzes your responses in real-time, providing detailed 
                  feedback on content, delivery, and areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of professionals who have improved their interview skills with InterviewAI.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg flex items-center gap-2 mx-auto group"
          >
            Start Practicing Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

     
    </div>
  );
}
