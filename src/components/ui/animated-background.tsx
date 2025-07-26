import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-orange-200/30 to-red-200/30 dark:from-orange-500/20 dark:to-red-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-violet-200/30 to-purple-200/30 dark:from-violet-500/20 dark:to-purple-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '8s' }} />
    </div>
  );
};

export default AnimatedBackground;