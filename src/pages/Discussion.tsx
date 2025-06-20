
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Users, Send, Share2 } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';
import { toast } from '@/hooks/use-toast';

const Discussion = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Reading Buddy', text: 'Welcome to the discussion room! Share your favorite story moments here!', time: '10:30 AM' },
    { id: 2, user: 'Alex', text: 'I loved the wise crow story! It taught me to never give up.', time: '10:32 AM' }
  ]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = async () => {
    if (!isVideoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsVideoOn(true);
        toast({
          title: "Camera On",
          description: "Your camera is now active!"
        });
      } catch (error) {
        toast({
          title: "Camera Error",
          description: "Could not access camera. Please check permissions."
        });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
      toast({
        title: "Camera Off",
        description: "Your camera is now off."
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On",
      description: isAudioOn ? "Your microphone is muted." : "Your microphone is active!"
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen Share Stopped" : "Screen Share Started",
      description: isScreenSharing ? "You stopped sharing your screen." : "You're now sharing your screen!"
    });
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <MascotOwl size={40} />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Discussion Room
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Read together and share stories!</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-sm">3 readers online</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-4">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                  {isVideoOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Camera is off</p>
                      </div>
                    </div>
                  )}
                  
                  {isScreenSharing && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Sharing Screen
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={toggleVideo}
                    className={`rounded-full p-4 ${isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                  >
                    {isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    onClick={toggleAudio}
                    className={`rounded-full p-4 ${isAudioOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  >
                    {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    onClick={toggleScreenShare}
                    className={`rounded-full p-4 ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg h-96 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Chat</h3>
                
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {messages.map(msg => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-purple-600 dark:text-purple-400">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Story Share */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mt-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Quick Story Share</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/reader/1')}
                variant="outline"
                className="p-4 h-auto bg-white/60 dark:bg-gray-700/60 hover:bg-white/80"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold mb-1">The Wise Crow</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Share this story</div>
                </div>
              </Button>
              
              <Button
                onClick={() => navigate('/reader/2')}
                variant="outline"
                className="p-4 h-auto bg-white/60 dark:bg-gray-700/60 hover:bg-white/80"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold mb-1">Birbal's Wisdom</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Share this story</div>
                </div>
              </Button>
              
              <Button
                onClick={() => navigate('/reader/3')}
                variant="outline"
                className="p-4 h-auto bg-white/60 dark:bg-gray-700/60 hover:bg-white/80"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold mb-1">Golden Fish</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Share this story</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discussion;
