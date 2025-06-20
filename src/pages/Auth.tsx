
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import MascotOwl from '@/components/MascotOwl';

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
        description: `Welcome to StoryScape, ${username}!`
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <MascotOwl size={60} className="mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Join StoryScape!'}
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {isLogin ? 'Continue your reading adventure' : 'Start your magical journey'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-full border-2 py-3"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full border-2 py-3"
              />
            </div>
            
            {!isLogin && (
              <div>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full border-2 py-3"
                />
              </div>
            )}
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Start Reading' : 'Create Account'}
            </Button>
          </form>
          
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up!" : "Already have an account? Sign in!"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
