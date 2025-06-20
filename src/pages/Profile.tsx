
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Palette, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MascotOwl from '@/components/MascotOwl';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const avatarOptions = [
    { emoji: '🦉', name: 'Wise Owl' },
    { emoji: '🐸', name: 'Happy Frog' },
    { emoji: '🦋', name: 'Beautiful Butterfly' },
    { emoji: '🐰', name: 'Cute Rabbit' },
    { emoji: '🦊', name: 'Clever Fox' },
    { emoji: '🐻', name: 'Friendly Bear' }
  ];

  const colorOptions = [
    { name: 'Sunset Orange', class: 'from-orange-400 to-pink-400' },
    { name: 'Ocean Blue', class: 'from-blue-400 to-cyan-400' },
    { name: 'Forest Green', class: 'from-green-400 to-emerald-400' },
    { name: 'Royal Purple', class: 'from-purple-400 to-indigo-400' },
    { name: 'Rose Gold', class: 'from-pink-400 to-rose-400' },
    { name: 'Sunshine Yellow', class: 'from-yellow-400 to-orange-400' }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('storyscape_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setSelectedAvatar(userData.avatar || 0);
      setSelectedColor(userData.color || 0);
    }
  }, []);

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        avatar: selectedAvatar,
        color: selectedColor
      };
      
      localStorage.setItem('storyscape_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile Updated!",
        description: "Your avatar and theme have been saved."
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('storyscape_user');
    toast({
      title: "Logged Out",
      description: "See you next time for more reading adventures!"
    });
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
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
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Customize your reading experience</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Avatar Selection */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Choose Your Avatar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedAvatar === index
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white scale-105 shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">{avatar.emoji}</div>
                    <div className="text-sm font-medium">{avatar.name}</div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-2">{avatarOptions[selectedAvatar].emoji}</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Your current avatar: {avatarOptions[selectedAvatar].name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Color Theme Selection */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-600" />
                Choose Your Theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                      selectedColor === index
                        ? 'ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-gray-800'
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.class}`} />
                    <span className="font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r ${colorOptions[selectedColor].class}`} />
                <p className="text-gray-600 dark:text-gray-400">
                  Current theme: {colorOptions[selectedColor].name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info & Actions */}
        <Card className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Welcome, {user.username}!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-4xl">
                {avatarOptions[selectedAvatar].emoji}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleSaveProfile}
                className={`flex-1 bg-gradient-to-r ${colorOptions[selectedColor].class} hover:opacity-90 text-white font-semibold py-3 rounded-full transition-all duration-300`}
              >
                Save Changes
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="px-6 py-3 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
