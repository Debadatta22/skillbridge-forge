import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings, BookOpen, PenTool } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onProgress, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [speed, setSpeed] = useState(1);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    const handleProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      onProgress?.(progress);
    };

    const handleEnded = () => {
      onComplete?.();
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const changeSpeed = (newSpeed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div 
        className="relative bg-black group"
        onMouseMove={showControlsTemporarily}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={videoUrl}
          onClick={togglePlay}
        />
        
        {/* Video Controls */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-200"
              >
                <Play className="w-12 h-12 text-white ml-1" />
              </button>
            </div>
          )}
          
          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none slider"
              />
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => skipTime(-10)} className="text-white hover:text-gray-300 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={() => skipTime(10)} className="text-white hover:text-gray-300 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume * 100}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none slider"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={speed}
                  onChange={(e) => changeSpeed(parseFloat(e.target.value))}
                  className="bg-black/50 text-white text-sm rounded px-2 py-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Info and Notes */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showNotes ? 'bg-primary text-white' : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Notes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-foreground hover:bg-accent/80 rounded-lg transition-colors">
            <BookOpen className="w-4 h-4" />
            Transcript
          </button>
        </div>
        
        {showNotes && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">My Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes while watching the video..."
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <button className="gradient-student text-white px-4 py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
              Save Notes
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;