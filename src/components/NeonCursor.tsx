import { useEffect, useState } from 'react';

const NeonCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-4 h-4 rounded-full bg-primary" />
      </div>
      
      {/* Glow effect */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className="w-10 h-10 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, hsl(75 100% 50% / 0.6) 0%, hsl(75 100% 50% / 0) 70%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className="w-20 h-20 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(75 100% 50% / 0.3) 0%, hsl(75 100% 50% / 0) 60%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </>
  );
};

export default NeonCursor;
