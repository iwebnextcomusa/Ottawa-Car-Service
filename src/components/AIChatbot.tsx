import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, CornerDownLeft, Phone, Calendar, User, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to OttawaCarService.net customer concierge. How can I assist you with your luxury private chauffeur or airport transportation needs in Ontario today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setErrorMsg(null);

    try {
      // Map history to standard chat format for our API
      const payloadMessages = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error('Could not connect to AI concierge');
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.text || 'I apologize, but I did not receive a clear response. Please contact our live dispatch at 416-720-0366 for immediate reservation help.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Service temporarily busy. Call 416-720-0366 for instant assistance.');
    } finally {
      setIsTyping(false);
    }
  };

  const insertQuickQuery = (text: string) => {
    setInputValue(text);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        {/* Help Bubble above the trigger */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="mb-3 bg-[#111111] text-xs text-white border border-white/10 px-4 py-2 hover:border-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span>Chat with Executive AI Concierge</span>
          </motion.button>
        )}

        <motion.button
          id="chatbot-toggle-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 flex items-center justify-center shadow-2xl cursor-pointer ${
            isOpen 
              ? 'bg-[#111111] border border-white/10 text-brand-gold' 
              : 'bg-brand-gold text-[#111111] hover:bg-white'
          } transition-colors duration-300`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[550px] max-h-[calc(100vh-180px)] bg-[#111111] border border-white/10 flex flex-col overflow-hidden shadow-2xl z-[9999]"
          >
            {/* Header */}
            <div className="bg-[#0d0d0d] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-gold/10 flex items-center justify-center border border-white/10">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Chauffeur AI Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-brand-gold/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>Active Concierge</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Informative Banner */}
            <div className="bg-[#111111] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[11px] text-gray-300">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-brand-gold" />
                Dispatch Support:
              </span>
              <a href="tel:4167200366" className="font-mono font-medium text-brand-gold hover:underline">
                416-720-0366
              </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-gold text-black font-medium'
                        : 'bg-[#0d0d0d] border border-white/10 text-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span
                      className={`text-[9px] block mt-1.5 text-right ${
                        msg.role === 'user' ? 'text-black/60' : 'text-gray-400/80'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0d0d0d] border border-white/10 px-4 py-3.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="flex justify-center">
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-xs flex items-start gap-2 max-w-[90%]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-white/10 flex gap-2 overflow-x-auto no-scrollbar bg-[#0d0d0d]">
                <button
                  onClick={() => insertQuickQuery('What is the travel time from Ottawa to Toronto?')}
                  className="flex-shrink-0 text-[11px] bg-[#111111] border border-white/10 text-gray-300 px-3 py-1.5 hover:border-brand-gold hover:text-white transition-colors cursor-pointer"
                >
                  Ottawa ↔ Toronto time?
                </button>
                <button
                  onClick={() => insertQuickQuery('How do airport pickups work at Toronto Pearson?')}
                  className="flex-shrink-0 text-[11px] bg-[#111111] border border-white/10 text-gray-300 px-3 py-1.5 hover:border-brand-gold hover:text-white transition-colors cursor-pointer"
                >
                  YYZ Airport Pickups?
                </button>
                <button
                  onClick={() => insertQuickQuery('What luxury vehicles do you have in your fleet?')}
                  className="flex-shrink-0 text-[11px] bg-[#111111] border border-white/10 text-gray-300 px-3 py-1.5 hover:border-brand-gold hover:text-white transition-colors cursor-pointer"
                >
                  Show Luxury Fleet
                </button>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#0d0d0d] flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about rates, fleets, airport connections..."
                className="flex-1 bg-[#111111] text-white border border-white/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={`p-2.5 flex items-center justify-center transition-all ${
                  inputValue.trim() && !isTyping
                    ? 'bg-brand-gold text-black hover:scale-105 cursor-pointer'
                    : 'bg-[#111111] text-gray-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
