
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import MascotOwl from '@/components/MascotOwl';
import { Sparkles, Heart, Moon } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (isLogin) {
      // Login logic
      const existingUsers = JSON.parse(localStorage.getItem('storyscape_users') || '[]');
      const user = existingUsers.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        localStorage.setItem('storyscape_user', JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `Good to see you again, ${username}!`
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
    } else {
      // Register logic
      const existingUsers = JSON.parse(localStorage.getItem('storyscape_users') || '[]');
      
      if (existingUsers.find((u: any) => u.username === username)) {
        toast({
          title: "Username Taken",
          description: "This username is already taken",
          variant: "destructive"
        });
        return;
      }

      const newUser = {
        username,
        password,
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('storyscape_users', JSON.stringify(existingUsers));
      localStorage.setItem('storyscape_user', JSON.stringify(newUser));
      
      // Initialize user stats
      localStorage.setItem('storyscape_stats', JSON.stringify({
        stars: 0,
        streak: 0,
        completedStories: [],
        badges: []
      }));

      toast({
        title: "Account Created!",
        description: `Welcome to Starry Tales, ${username}!`
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bedtime-gradient-soft opacity-30"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
      
      <Card className="w-full max-w-md mx-auto story-card relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="relative inline-block mb-6">
            <MascotOwl size={60} className="animate-float-gentle" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gradient mb-2">
            {isLogin ? 'Welcome Back!' : 'Join Starry Tales!'}
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {isLogin ? 'Continue your bedtime adventure' : 'Start your magical journey'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-2xl border-2 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl border-2 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
              />
            </div>
            
            {!isLogin && (
              <div>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-2xl border-2 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
                />
              </div>
            )}
            
            <Button 
              type="submit"
              className="w-full btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? 'Start Reading' : 'Create Account'}
            </Button>
          </form>
          
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up!" : "Already have an account? Sign in!"}
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm">Sweet dreams await</span>
            <Moon className="w-4 h-4 text-purple-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
