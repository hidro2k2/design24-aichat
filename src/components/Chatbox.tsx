import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Wifi, WifiOff, Plus } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useChatSessions } from '@/hooks/useChatSessions';
import { geminiService } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';

interface TypingMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: number;
  isTyping: boolean;
}

export function Chatbox() {
  const {
    chatSessions,
    currentChatId,
    currentChat,
    createNewChat,
    addMessage,
    loadChatSession,
    deleteChatSession,
    clearAllChatSessions,
  } = useChatSessions();

  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState<TypingMessage | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, typingMessage]);

  // Show welcome message for empty chats
  useEffect(() => {
    if (currentChat && currentChat.messages.length === 0) {
      const welcomeMessageId = addMessage(
        "Xin chào! Tôi là trợ lý AI cho khóa học 'Kỹ năng AI cho Hướng dẫn viên Du lịch' của DESIGN24. Tôi ở đây để giúp bạn học cách sử dụng công cụ AI để nâng cao trải nghiệm hướng dẫn du lịch. Hãy thoải mái hỏi tôi bất cứ điều gì về marketing số, nhiếp ảnh, công cụ AI hoặc bất kỳ chủ đề khóa học nào khác!",
        false
      );
    }
  }, [currentChat?.id, addMessage]);

  const handleSendMessage = async (message: string) => {
    if (!currentChatId) {
      const newChatId = createNewChat();
      if (!newChatId) return;
    }

    if (!isOnline) {
      toast({
        title: "Không có kết nối Internet",
        description: "Vui lòng kiểm tra kết nối internet và thử lại.",
        variant: "destructive",
      });
      return;
    }

    if (!geminiService.isConfigured()) {
      toast({
        title: "Yêu cầu API Key",
        description: "Vui lòng làm mới trang và nhập khóa API Gemini của bạn.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    addMessage(message, true);
    setIsLoading(true);

    try {
      // Create conversation context for API
      const conversationMessages = currentChat?.messages.map(msg => ({
        message: msg.message,
        isUser: msg.isUser
      })) || [];

      // Get AI response
      const response = await geminiService.sendMessage(conversationMessages, message);

      // Show typing animation
      const typingId = `typing-${Date.now()}`;
      setTypingMessage({
        id: typingId,
        message: response,
        isUser: false,
        timestamp: Date.now(),
        isTyping: true,
      });

      // Wait for typing animation to complete, then add the actual message
      setTimeout(() => {
        addMessage(response, false);
        setTypingMessage(null);
      }, Math.min(response.length * 20, 3000)); // Dynamic timing based on response length

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Xin lỗi, tôi gặp lỗi. Vui lòng thử lại.';
      
      addMessage(errorMessage, false);
      
      toast({
        title: "Lỗi",
        description: "Không thể nhận phản hồi từ AI. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    createNewChat();
    toast({
      title: "Tạo cuộc trò chuyện mới",
      description: "Bạn có thể bắt đầu cuộc trò chuyện mới.",
    });
  };

  const handleSelectChat = (chatId: string) => {
    loadChatSession(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChatSession(chatId);
    toast({
      title: "Đã xóa cuộc trò chuyện",
      description: "Cuộc trò chuyện đã được xóa.",
    });
  };

  const handleClearAllChats = () => {
    clearAllChatSessions();
    toast({
      title: "Đã xóa tất cả cuộc trò chuyện",
      description: "Tất cả cuộc trò chuyện đã được xóa.",
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile, can be enhanced with a toggle later */}
      <div className="hidden md:block">
        <ChatSidebar
          chatSessions={chatSessions}
          currentChatId={currentChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onClearAllChats={handleClearAllChats}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-chat-gradient rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-lg truncate">
                {currentChat?.title || 'Trợ lý AI'}
              </h2>
              <p className="text-xs text-muted-foreground truncate">
                DESIGN24 • Kỹ năng AI cho Hướng dẫn viên Du lịch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile New Chat Button */}
            <Button 
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Plus className="w-4 h-4" />
            </Button>
            
            <div className={`hidden sm:flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
              isOnline 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {isOnline ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">{isOnline ? 'Trực tuyến' : 'Ngoại tuyến'}</span>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {!geminiService.isConfigured() && (
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Vui lòng làm mới trang và nhập khóa API Gemini để bắt đầu trò chuyện.
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2"
                    onClick={() => window.location.reload()}
                  >
                    Làm mới trang
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Welcome message for new users */}
            {Object.keys(chatSessions).length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-chat-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-2xl">D24</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">
                  Chào mừng đến với Trợ lý AI DESIGN24
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Tôi ở đây để giúp bạn thành thạo kỹ năng AI cho việc hướng dẫn du lịch. Hãy bắt đầu bằng cách tạo cuộc trò chuyện mới hoặc hỏi tôi về bất kỳ chủ đề khóa học nào!
                </p>
                <Button onClick={handleNewChat} variant="hero">
                  Bắt đầu cuộc trò chuyện đầu tiên
                </Button>
              </div>
            )}

            {/* Chat Messages */}
            {currentChat?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                id={message.id}
                message={message.message}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}

            {/* Typing Message */}
            {typingMessage && (
              <ChatMessage
                id={typingMessage.id}
                message={typingMessage.message}
                isUser={typingMessage.isUser}
                timestamp={typingMessage.timestamp}
                isTyping={typingMessage.isTyping}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!currentChatId || !geminiService.isConfigured() || !isOnline}
        />
      </div>
    </div>
  );
}