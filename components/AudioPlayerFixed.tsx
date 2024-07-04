import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';

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

const AudioPlayer: React.FC = () => {
  const { currentSong, title, genre, total_duration, isPlaying, currentTime, setIsPlaying, setCurrentTime } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // useEffect(() => {
  //   const savedIsPlaying = localStorage.getItem('isPlaying');
  //   if (savedIsPlaying) {
  //     setIsPlaying(savedIsPlaying === 'true');
  //   }
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = currentSong;
      audio.currentTime = currentTime;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

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
  }, [currentSong, isPlaying]);

  // const handlePlayPause = () => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     if (isPlaying) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //     localStorage.setItem('isPlaying', (!isPlaying).toString());
  //   }
  // };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex items-center">
      <audio ref={audioRef} className="w-full">
        <source src={currentSong} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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

      <div className="flex-grow items-center ml-4 w-[40%] lg:flex grid grid-rows-1">
        <div className="flex flex-col justify-center w-80">
          <p className="text-md font-semibold relative whitespace-wrap">{title}</p>
          <a href={`/search/${genre}`} className="text-sm text-blue-600 hover:underline">{genre}</a>
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          aria-label='audioSlider'
          className="h-4 appearance-none bg-gray-300 rounded-md lg:mr-7 md:w-[80%] w-[60%] lg:mt-0 mt-2 lg:w-[43%] flex-grow"
        />
        <p className="text-gray-500 lg:ml-0 ml-44 lg:mt-0 mt-2">{convertSecondsToMinutesString(total_duration)}</p>

        <div className="flex-shrink-0 sm:mt-0 mt-9">
          <DownloadAudio fileName={`rfai_}.mp3`} fileUrl={currentSong} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
