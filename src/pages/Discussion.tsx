
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MessageCircle, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Share2, 
  Users, 
  UserPlus, 
  Heart, 
  Send,
  Monitor,
  MonitorOff,
  BookOpen,
  Star,
  Trophy,
  Camera,
  CameraOff,
  Link,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'link' | 'image';
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isReading: boolean;
}

const Discussion = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isReadingTogether, setIsReadingTogether] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Emma',
      text: 'Hi everyone! Who wants to read "The Wise Crow" together? 🦉',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      user: 'Liam',
      text: 'Me! I love that story! Can we start in 5 minutes?',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      user: 'Sophia',
      text: 'https://starrytales.com/story/wise-crow',
      timestamp: new Date(Date.now() - 180000),
      type: 'link'
    }
  ]);
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Emma', avatar: '👧', isOnline: true, isReading: false },
    { id: '2', name: 'Liam', avatar: '👦', isOnline: true, isReading: true },
    { id: '3', name: 'Sophia', avatar: '👧', isOnline: false, isReading: false },
    { id: '4', name: 'Noah', avatar: '👦', isOnline: true, isReading: false },
    { id: '5', name: 'Olivia', avatar: '👧', isOnline: true, isReading: false }
  ]);
  const [activeTab, setActiveTab] = useState<'chat' | 'friends' | 'reading'>('chat');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: 'You',
        text: currentMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Here you would implement actual video functionality
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // Here you would implement actual audio functionality
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Here you would implement actual screen sharing functionality
  };

  const startReadingTogether = () => {
    setIsReadingTogether(true);
    // Here you would implement synchronized reading functionality
  };

  const addFriend = () => {
    if (newFriendName.trim()) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: newFriendName,
        avatar: '👤',
        isOnline: true,
        isReading: false
      };
      setFriends([...friends, newFriend]);
      setNewFriendName('');
      setShowAddFriend(false);
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bedtime-gradient-soft opacity-30"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="rounded-full p-2 hover:bg-white/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <MascotOwl size={40} className="animate-float-gentle" />
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  Reading Community
                </h1>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Connect with friends and read together!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Friends & Community */}
          <div className="lg:col-span-1 space-y-6">
            {/* Friends List */}
            <Card className="story-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Friends Online
                  </CardTitle>
                  <Button
                    onClick={() => setShowAddFriend(true)}
                    size="sm"
                    className="rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                    <div className="relative">
                      <div className="text-2xl">{friend.avatar}</div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        friend.isOnline ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{friend.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {friend.isReading ? '📖 Reading together' : 'Online'}
                      </div>
                    </div>
                    {friend.isReading && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reading Together Controls */}
            <Card className="story-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Read Together
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={toggleVideo}
                    variant={isVideoOn ? "default" : "outline"}
                    className={`rounded-2xl ${isVideoOn ? 'bg-purple-500 hover:bg-purple-600 text-white' : ''}`}
                  >
                    {isVideoOn ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                    Camera
                  </Button>
                  <Button
                    onClick={toggleAudio}
                    variant={isAudioOn ? "default" : "outline"}
                    className={`rounded-2xl ${isAudioOn ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
                  >
                    {isAudioOn ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                    Voice
                  </Button>
                </div>
                <Button
                  onClick={toggleScreenShare}
                  variant={isScreenSharing ? "default" : "outline"}
                  className={`w-full rounded-2xl ${isScreenSharing ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                >
                  {isScreenSharing ? <MonitorOff className="w-4 h-4 mr-2" /> : <Monitor className="w-4 h-4 mr-2" />}
                  {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                </Button>
                <Button
                  onClick={startReadingTogether}
                  className="w-full btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Reading Together
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Chat & Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Area */}
            <Card className="story-card">
              <CardContent className="p-6">
                <div className="relative">
                  {isVideoOn ? (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover rounded-2xl"
                        autoPlay
                        muted
                        playsInline
                      />
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        Your Camera
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">Camera is off</p>
                        <Button
                          onClick={toggleVideo}
                          className="mt-4 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          Turn On Camera
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="story-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Community Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto space-y-4 mb-4">
                  {messages.map(message => (
                    <div key={message.id} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                        message.user === 'You' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm'
                      }`}>
                        <div className="font-medium text-sm mb-1">
                          {message.user}
                        </div>
                        <div className="text-sm">
                          {message.type === 'link' ? (
                            <a href={message.text} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-500 hover:underline">
                              {message.text}
                            </a>
                          ) : (
                            message.text
                          )}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.user === 'You' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 rounded-2xl border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-2xl bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Friend Modal */}
        {showAddFriend && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md story-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Add New Friend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  placeholder="Enter friend's name"
                  className="rounded-2xl border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={addFriend}
                    className="flex-1 btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl"
                  >
                    Add Friend
                  </Button>
                  <Button
                    onClick={() => setShowAddFriend(false)}
                    variant="outline"
                    className="flex-1 rounded-2xl border-purple-200 dark:border-purple-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
