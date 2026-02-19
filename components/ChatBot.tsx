
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatBotProps {
  initialImages: string[];
}

const ChatBot: React.FC<ChatBotProps> = ({ initialImages }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to EliteExpress. I've analyzed your photos from Step 1. Please tell me about your needs, or ask for my recommendation! \n\nI'll need your phone number to coordinate arrival, and you can pick a live appointment slot in the calendar below.",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      images: messages.length < 2 ? initialImages : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await geminiService.getChatResponse(
      input, 
      messages.slice(1), 
      initialImages, 
      useThinking
    );
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden orchid-shadow">
      {/* Header */}
      <div className="bg-slate-800 p-5 text-white flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 orchid-bg rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black orchid-text tracking-wide">Elite AI Advisor</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Vision-Enabled Assistant</p>
          </div>
        </div>
        <label className="flex items-center cursor-pointer bg-slate-700/50 px-3 py-2 rounded-xl border border-slate-600">
          <span className="text-[10px] font-black mr-2 text-slate-300">SMART MODE</span>
          <input 
            type="checkbox" 
            checked={useThinking} 
            onChange={() => setUseThinking(!useThinking)}
            className="w-4 h-4 rounded accent-fuchsia-500"
          />
        </label>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-950/30">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl p-5 shadow-xl transition-all ${
              m.role === 'user' 
                ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-br-none' 
                : 'bg-slate-800/40 text-slate-200 border border-slate-800 rounded-bl-none'
            }`}>
              {m.images && m.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {m.images.map((img, i) => (
                    <img key={i} src={img} className="w-full h-24 object-cover rounded-lg border border-slate-600" alt="Analysis" />
                  ))}
                  <div className="col-span-2 text-[10px] font-black orchid-text uppercase text-center py-1">Analyzing all {m.images.length} views</div>
                </div>
              )}
              <p className="text-xl leading-relaxed font-medium whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 orchid-bg rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 orchid-bg rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2.5 h-2.5 orchid-bg rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-slate-400 font-bold italic text-lg">Elite AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-900 border-t border-slate-800">
        {initialImages.length > 0 && (
          <div className="mb-4 flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex -space-x-3 overflow-hidden">
              {initialImages.map((img, i) => (
                <img key={i} src={img} className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" alt="View" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{initialImages.length} Photo Views Analyzed</span>
          </div>
        )}
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow p-5 bg-slate-950 border-2 border-slate-800 rounded-2xl text-xl font-bold text-white focus:outline-none focus:orchid-border transition-all placeholder:text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="orchid-bg hover:opacity-90 text-white px-10 rounded-2xl font-black text-xl shadow-2xl transition-all disabled:opacity-20 flex items-center"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
