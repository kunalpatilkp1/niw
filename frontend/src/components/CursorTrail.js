import { useEffect, useState } from 'react';

export const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };

      setTrail((prev) => [...prev.slice(-20), newDot]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{
            left: dot.x,
            top: dot.y,
            opacity: i / trail.length,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.5s ease-out',
            boxShadow: '0 0 10px rgba(167, 139, 250, 0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;