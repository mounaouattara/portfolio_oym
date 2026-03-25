import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { askDigitalBrain } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';

const AIAssistant: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  useEffect(() => {
    setChatHistory([{ 
      id: 0, 
      sender: 'bot', 
      text: "Bonjour ! Je suis l'assistant virtuel de Mouna. Comment puis-je vous aider à découvrir son parcours ou ses projets aujourd'hui ?" 
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: messageIdCounter.current++, sender: 'user', text: input };
    setChatHistory(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    
    try {
      const botResponseText = await askDigitalBrain(currentInput);
      setChatHistory(prev => [...prev, { id: messageIdCounter.current++, sender: 'bot', text: botResponseText }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { id: messageIdCounter.current++, sender: 'bot', text: "Désolé, une erreur de connexion est survenue. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cocoa/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl h-[600px] bg-cocoa border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center text-cocoa shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Assistant IA</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">En ligne</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-cocoa/50">
          {chatHistory.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-white/10 text-white border border-white/10' : 'bg-sand text-cocoa'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-white/5 text-white rounded-tr-none border border-white/10' 
                  : 'bg-white/10 text-white rounded-tl-none border border-white/10'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-sand text-cocoa flex items-center justify-center shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/5">
                Réflexion en cours...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 bg-white/5 border-t border-white/5">
          <div className="relative flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sand/50 transition-all"
              placeholder="Posez une question sur Mouna..."
              autoFocus
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 bg-sand text-cocoa rounded-2xl flex items-center justify-center shadow-lg hover:shadow-sand/20 transition-all disabled:opacity-50 disabled:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AIAssistant;
