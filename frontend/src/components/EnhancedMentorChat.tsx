import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  Filter,
  Archive,
  Star,
  Reply,
  Forward,
  Download,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Image,
  FileText,
  X,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  User,
  Bot,
  MessageCircle,
  PhoneCall,
  VideoCall,
  Calendar,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'student' | 'mentor' | 'system';
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  attachments?: Attachment[];
  replyTo?: string;
  reactions?: Reaction[];
  isTyping?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: 'general' | 'academic' | 'personal' | 'urgent';
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'video';
  size: number;
  url: string;
  thumbnail?: string;
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface Mentor {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  department: string;
  specialization: string[];
  rating: number;
  totalStudents: number;
}

interface Student {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  year: number;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface EnhancedMentorChatProps {
  student: Student;
  mentor: Mentor;
  messages: Message[];
  onSendMessage: (message: string, attachments?: File[]) => void;
  onSendReaction: (messageId: string, emoji: string) => void;
  onReply: (messageId: string, text: string) => void;
  onForward: (messageId: string, recipientId: string) => void;
  onScheduleMeeting: () => void;
  onViewProfile: (userId: string) => void;
  isConnected: boolean;
}

const EnhancedMentorChat: React.FC<EnhancedMentorChatProps> = ({
  student,
  mentor,
  messages,
  onSendMessage,
  onSendReaction,
  onReply,
  onForward,
  onScheduleMeeting,
  onViewProfile,
  isConnected
}) => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onSendMessage(messageText, files);
      setMessageText('');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'away': return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'busy': return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-white';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'personal': return <User className="w-4 h-4" />;
      case 'urgent': return <AlertCircle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || message.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const quickActions = [
    { icon: Calendar, label: 'Schedule Meeting', action: onScheduleMeeting },
    { icon: BookOpen, label: 'Academic Help', action: () => onSendMessage('I need help with my studies') },
    { icon: Target, label: 'Set Goals', action: () => onSendMessage('Let\'s discuss my academic goals') },
    { icon: TrendingUp, label: 'Progress Review', action: () => onSendMessage('Can we review my progress?') }
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-shadow">
        <div className="flex items-center space-x-3" onClick={() => setIsMinimized(false)}>
          <div className="relative">
            {mentor.avatar ? (
              <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
            {getStatusIcon(mentor.status)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{mentor.name}</div>
            <div className="text-sm text-gray-500">Click to expand chat</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {mentor.avatar ? (
              <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
            {getStatusIcon(mentor.status)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-500">
              {mentor.department} • {mentor.status}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewProfile(mentor.id)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="View Profile"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={onScheduleMeeting}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Schedule Meeting"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      {showSearch && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="personal">Personal</option>
              <option value="urgent">Urgent</option>
            </select>
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'student'
                  ? 'bg-blue-600 text-white'
                  : message.sender === 'system'
                  ? 'bg-gray-100 text-gray-700 text-center'
                  : 'bg-gray-100 text-gray-900'
              } ${getPriorityColor(message.priority)}`}
            >
              {message.replyTo && (
                <div className="text-xs opacity-75 mb-1 border-l-2 border-current pl-2">
                  Replying to message...
                </div>
              )}
              <div className="flex items-start space-x-2">
                {message.sender !== 'student' && message.sender !== 'system' && (
                  <div className="flex-shrink-0">
                    {getCategoryIcon(message.category)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center space-x-2 text-xs">
                          <Paperclip className="w-3 h-3" />
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-75">
                  {formatTimestamp(message.timestamp)}
                </span>
                <div className="flex items-center space-x-1">
                  {message.isDelivered && <Check className="w-3 h-3" />}
                  {message.isRead && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
              {message.reactions && message.reactions.length > 0 && (
                <div className="flex items-center space-x-1 mt-1">
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      onClick={() => onSendReaction(message.id, reaction.emoji)}
                      className="text-xs hover:bg-gray-200 rounded px-1"
                    >
                      {reaction.emoji} {reaction.count}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Quick Actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Connection Status */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          {isTyping && (
            <span className="text-blue-600">Typing...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedMentorChat;
