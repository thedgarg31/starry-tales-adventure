
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import Reader from "./pages/Reader";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Discussion from "./pages/Discussion";
import NotFound from "./pages/NotFound";
import ParentDashboard from "./pages/ParentDashboard";
import WorldMap from "./pages/WorldMap";
import Encyclopedia from "./pages/Encyclopedia";
import Drawing from "./pages/Drawing";
import Puzzle from "./pages/Puzzle";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showQuote, setShowQuote] = useState(true);
  useEffect(() => {
    // Show quote modal on app load
    setShowQuote(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showQuote && <DailyQuoteModal onClose={() => setShowQuote(false)} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/library" element={<Library />} />
            <Route path="/reader/:storyId" element={<Reader />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/world-map" element={<WorldMap />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// DailyQuoteModal component
const quotes = [
  "The more that you read, the more things you will know. The more that you learn, the more places you’ll go. – Dr. Seuss",
  "Reading is to the mind what exercise is to the body. – Joseph Addison",
  "A book is a dream that you hold in your hand. – Neil Gaiman",
  "Today a reader, tomorrow a leader. – Margaret Fuller",
  "There is more treasure in books than in all the pirate’s loot on Treasure Island. – Walt Disney",
  "Once you learn to read, you will be forever free. – Frederick Douglass",
  "Books are a uniquely portable magic. – Stephen King",
  "Reading gives us someplace to go when we have to stay where we are. – Mason Cooley"
];

function DailyQuoteModal({ onClose }: { onClose: () => void }) {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          ×
        </button>
        <h2 className="text-2xl font-bold text-gradient mb-4">Daily Motivation</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 italic mb-2">“{quote}”</p>
        <div className="mt-4">
          <button onClick={onClose} className="btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl px-6 py-2 font-semibold">Start Reading</button>
        </div>
      </div>
    </div>
  );
}

export default App;
