// AudioPlayer.tsx
// https://chat.openai.com/share/5c480b2b-0c15-4035-baa6-c027fa8a6cf3

// In this audio player we are only going to load audio after click on play.

import React, { useState, useRef, useEffect } from 'react';
import {
  TbArrowsShuffle2,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbVolume,
  TbVolume3,
} from "react-icons/tb";
import DownloadAudio from './DownloadAudio';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  genre: string;
  total_duration?: number | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, title, genre, total_duration }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    audio?.addEventListener('timeupdate', handleTimeUpdate);
    audio?.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isAudioLoaded) {
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      // Load the audio file and set isAudioLoaded to true
      audioRef.current?.load();
      setIsAudioLoaded(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const convertSecondsToMinutesString = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format the string as "mm:ss"
    const formattedString = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedString;
  };

  return (
    <div className="bg-gray-200 lg:p-8 flex flex-row rounded-lg overflow-hidden py-5">
      {/* Icon at the start */}
      <button
        id='player'
        aria-label='audioPlayer'
        title='CustomAudioPlayer'
        onClick={handlePlayPause}
        className="mr-4 sm:ml-0 ml-3 flex-shrink-0">

        {isPlaying ? (
          <TbPlayerPause size={40} />
        ) : (
          <TbPlayerPlay size={40} />
        )}
      </button>
      <audio ref={audioRef} src={audioSrc}></audio>

      {/* Title and genre with fixed width */}


      {/* Input field with flex-grow to take up remaining space */}
      <div className="flex-grow items-center ml-4 w-[40%] lg:flex grid grid-rows-1">

        <div className="flex flex-col justify-center w-80">
          <p className="text-md font-semibold relative whitespace-wrap">{title}</p>
          <a href={`/search/${genre}`} className="text-sm text-blue-600 hover:underline">{genre}</a>
        </div>
        <input
          type="range"
          min={0}
          max={audioRef.current?.duration || 0}
          value={currentTime}
          onChange={handleSeek}
          aria-label='audioSlider'
          className="h-4 appearance-none bg-gray-300 rounded-md lg:mr-7 md:w-[80%] w-[60%] lg:mt-0 mt-2 lg:w-[43%] flex-grow"
        />
        <p className="text-gray-500 lg:ml-0 ml-44 lg:mt-0 mt-2">{convertSecondsToMinutesString(total_duration ?? 10)}</p>
      </div>

      {/* Download button at the end with fixed width */}
      <div className="flex-shrink-0 sm:mt-0 mt-9">
        <DownloadAudio fileName={`rfai_${title}.mp3`} fileUrl={audioSrc} />
      </div>
    </div>

  );
};

export default AudioPlayer;
