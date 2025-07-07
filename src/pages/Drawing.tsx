import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const colors = ['#A855F7', '#EC4899', '#F59E0B', '#3B82F6', '#22D3EE', '#10B981', '#F43F5E', '#000000', '#FFFFFF'];

const Drawing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#A855F7');

  const startDrawing = (e: React.MouseEvent) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold text-gradient mb-6">Drawing Board</h1>
      <Card className="story-card w-full max-w-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-purple-500' : 'border-gray-300'}`}
                style={{ background: c }}
              />
            ))}
            <Button onClick={clearCanvas} className="ml-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white">Clear</Button>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border-2 border-purple-200 rounded-2xl bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Drawing; 