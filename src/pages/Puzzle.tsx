import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PUZZLE_SIZE = 3; // 3x3 grid
const PIECES = PUZZLE_SIZE * PUZZLE_SIZE;
const PUZZLE_IMAGE = '/puzzle-animals'; // Use the new image from public folder

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Puzzle = () => {
  // Each piece is {row, col, index}
  const pieces = Array.from({ length: PIECES }, (_, i) => ({
    row: Math.floor(i / PUZZLE_SIZE),
    col: i % PUZZLE_SIZE,
    index: i
  }));

  const [shuffled, setShuffled] = useState<number[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setShuffled(shuffle(pieces.map(p => p.index)));
    setCompleted(false);
  }, []);

  useEffect(() => {
    if (shuffled.every((val, idx) => val === idx)) {
      setCompleted(true);
    }
  }, [shuffled]);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDrop = (targetIdx: number) => {
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const newShuffled = [...shuffled];
    [newShuffled[draggedIdx], newShuffled[targetIdx]] = [newShuffled[targetIdx], newShuffled[draggedIdx]];
    setShuffled(newShuffled);
    setDraggedIdx(null);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold text-gradient mb-6">Jigsaw Puzzle</h1>
      <div className="mb-4">
        <span className="font-semibold">Preview:</span>
        <img src={PUZZLE_IMAGE} alt="Puzzle Preview" className="w-40 h-28 object-cover rounded-xl border-2 border-purple-200 ml-2 inline-block align-middle" />
      </div>
      <Card className="story-card w-full max-w-xl">
        <CardContent className="p-6 flex flex-col items-center">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${PUZZLE_SIZE}, 80px)`,
              gridTemplateRows: `repeat(${PUZZLE_SIZE}, 80px)`
            }}
          >
            {shuffled.map((pieceIdx, gridIdx) => {
              const { row, col } = pieces[pieceIdx];
              return (
                <div
                  key={gridIdx}
                  draggable={!completed}
                  onDragStart={() => handleDragStart(gridIdx)}
                  onDrop={() => handleDrop(gridIdx)}
                  onDragOver={handleDragOver}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden shadow-md bg-white cursor-move transition-all duration-200 ${completed ? 'opacity-80' : 'hover:scale-105'}`}
                  style={{
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundSize: `${PUZZLE_SIZE * 100}% ${PUZZLE_SIZE * 100}%`,
                    backgroundPosition: `${(col / (PUZZLE_SIZE - 1)) * 100}% ${(row / (PUZZLE_SIZE - 1)) * 100}%`
                  }}
                />
              );
            })}
          </div>
          {completed && (
            <div className="text-green-600 font-bold text-xl mt-6 animate-bounce">🎉 Puzzle Completed! Great job!</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Puzzle; 