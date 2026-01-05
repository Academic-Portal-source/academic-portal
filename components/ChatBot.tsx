
import React, { useState, useRef, useEffect } from 'react';
import { getAcademicAssistantResponse } from '../services/geminiService';
import { Role } from '../types';

interface ChatBotProps {
  role: Role;
}

const ChatBot: React.FC<ChatBotProps> = ({ role }) => {
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([
    { text: `Hi there! I'm your AI Academic Assistant. How can I help you today?`, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    const response = await getAcademicAssistantResponse(userMessage, role);
    setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="p-4 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <h2 className="font-bold">Academic Assistant</h2>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.sender === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-800'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-safe">
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl items-center pr-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm h-10"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="size-8 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
