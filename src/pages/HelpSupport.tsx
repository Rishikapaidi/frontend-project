import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: string;
}

const HelpSupport = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your support assistant. How can I help you today?",
      isBot: true,
      timestamp: formatTime(new Date()),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const faqQuestions = [
    { id: 1, question: "How do I book a service?" },
    { id: 2, question: "How can I become a service provider?" },
    { id: 3, question: "What payment methods are accepted?" },
    { id: 4, question: "How do I cancel a booking?" },
  ];

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isBot: false,
      timestamp: formatTime(new Date()),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: formatTime(new Date()),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleFaqClick = (question: string) => {
    // Add FAQ question as user message
    const userMessage: Message = {
      text: question,
      isBot: false,
      timestamp: formatTime(new Date()),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(question),
        isBot: true,
        timestamp: formatTime(new Date()),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('book') || lowerCaseMessage.includes('booking')) {
      return 'To book a service, browse services on the main dashboard, select the service you want, and click "Book Now". Then select your preferred date and time, add any additional notes, and confirm your booking.';
    } else if (lowerCaseMessage.includes('cancel')) {
      return 'To cancel a booking, go to your Bookings page, find the booking you want to cancel, and click the Cancel button. Cancellations made within 24 hours of the service may incur a cancellation fee.';
    } else if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('pay')) {
      return 'We accept all major credit cards, PayPal, and Apple Pay. Payment is processed securely when you confirm your booking.';
    } else if (lowerCaseMessage.includes('provider') || lowerCaseMessage.includes('become')) {
      return 'To become a service provider, please go to the Profile page and click on "Become a Provider". You\'ll need to complete an application, provide identification, and pass a background check.';
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return 'Hello there! How can I help you today?';
    } else {
      return "I'm not sure I understand your question. Please try rephrasing or select one of the common questions below.";
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      
      <div className="flex-1">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <h1 className="text-xl font-bold">Help & Support</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat section */}
            <div className="md:w-2/3">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden flex flex-col`}>
                <div className={`p-4 ${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white flex items-center`}>
                  <div className="p-2 rounded-full bg-white bg-opacity-10 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold">Support Assistant</h2>
                </div>

                <div className={`flex-1 p-4 overflow-y-auto max-h-96 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ minHeight: '400px' }}>
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.isBot ? '' : 'flex justify-end'}`}>
                      <div className={`p-3 rounded-lg inline-block max-w-xs md:max-w-md ${
                        message.isBot 
                          ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}` 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 ${message.isBot ? (darkMode ? 'text-gray-400' : 'text-gray-500') : 'text-blue-100'}`}>
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className={`p-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} border-t`}>
                  <div className="flex">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className={`flex-1 p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact and FAQ section */}
            <div className="md:w-1/3 mt-6 md:mt-0">
              {/* Contact */}
              <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow p-4 mb-6`}>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mr-3`}>
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>support@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mr-3`}>
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>1-800-SUPPORT</span>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow p-4`}>
                <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
                
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      className={`w-full p-2 pl-10 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {faqQuestions.map((faq) => (
                    <li key={faq.id}>
                      <button
                        onClick={() => handleFaqClick(faq.question)}
                        className={`flex items-center w-full p-2 rounded-md text-left ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-200' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {faq.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport; 