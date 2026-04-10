// Simplified 3D scene using CSS animations instead of React Three Fiber
// to avoid React 19 compatibility issues

export const Scene3D = () => {
  return (
    <div className="scene-container">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-sky-50"></div>
        
        {/* Floating 3D-style shapes using CSS */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-sky-400/20 rounded-3xl floating-animation blur-2xl"
             style={{ animationDelay: '0s', transform: 'rotate(45deg)' }}></div>
        <div className="absolute top-40 right-1/4 w-40 h-40 bg-sky-500/20 rounded-full floating-animation blur-3xl"
             style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-sky-300/20 rounded-2xl floating-animation blur-2xl"
             style={{ animationDelay: '4s', transform: 'rotate(-30deg)' }}></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-white/30 rounded-full floating-animation blur-xl"
             style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-44 h-44 bg-sky-400/20 rounded-3xl floating-animation blur-3xl"
             style={{ animationDelay: '3s', transform: 'rotate(60deg)' }}></div>
      </div>
    </div>
  );
};

export default Scene3D;
