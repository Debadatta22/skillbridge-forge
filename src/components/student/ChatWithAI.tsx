import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, RefreshCw } from 'lucide-react';
import { toast } from '../ui/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatWithAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I\'m here to help you with your studies, answer questions about courses, career guidance, and provide learning support. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Thank you for your question! This is a demo response. Once the backend API is integrated, I\'ll provide personalized and intelligent responses to help with your learning journey.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Message copied to clipboard",
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: 'Hello! I\'m your AI assistant. I\'m here to help you with your studies, answer questions about courses, career guidance, and provide learning support. What would you like to know?',
        timestamp: new Date()
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "Conversation has been reset",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-background rounded-2xl border border-border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Chat with AI</h1>
                <p className="text-sm text-muted-foreground">Get instant help with your studies and career questions</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              
              <div className={`max-w-[70%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'ai' && (
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-6">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies, courses, or career..."
              className="flex-1 px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setInputValue('How can I improve my programming skills?')}
              className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
            >
              Improve programming skills
            </button>
            <button
              onClick={() => setInputValue('What are the latest industry trends?')}
              className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
            >
              Industry trends
            </button>
            <button
              onClick={() => setInputValue('Help me plan my study schedule')}
              className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
            >
              Study planning
            </button>
            <button
              onClick={() => setInputValue('Career guidance for tech roles')}
              className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
            >
              Career guidance
            </button>
          </div>
        </div>
      </div>
      
      {/* Help Section */}
      <div className="mt-6 p-6 bg-accent/20 rounded-xl border border-border">
        <h3 className="font-semibold text-foreground mb-3">How can I help you today?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">📚 Study Support</h4>
            <ul className="space-y-1">
              <li>• Course explanations</li>
              <li>• Assignment help</li>
              <li>• Study strategies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">🎯 Career Guidance</h4>
            <ul className="space-y-1">
              <li>• Industry insights</li>
              <li>• Skill recommendations</li>
              <li>• Job preparation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">💡 Learning Tips</h4>
            <ul className="space-y-1">
              <li>• Best practices</li>
              <li>• Resource suggestions</li>
              <li>• Productivity tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;