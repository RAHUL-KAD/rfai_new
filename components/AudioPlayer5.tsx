import React, { useRef, useEffect } from 'react';
import { TbPlayerPause, TbPlayerPlay } from 'react-icons/tb';
import { useAudio } from '../context/AudioContext';
import DownloadAudio from './DownloadAudio';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  genre: string;
  total_duration: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, title, genre, total_duration }) => {
  const { currentSong, title: currentTitle, genre: currentGenre, total_duration: currentDuration, isPlaying, setCurrentSong, setIsPlaying } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     if (currentSong === audioSrc) {
  //       isPlaying ? audio.play() : audio.pause();
  //     }
  //   }
  // }, [currentSong, isPlaying, audioSrc]);

  const handlePlayPause = () => {
    if (currentSong !== audioSrc) {
      setCurrentSong(audioSrc, title, genre, total_duration);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
      // localStorage.setItem('isPlaying', (!isPlaying).toString());
    }
  };

  // useEffect(() => {
  //   const savedIsPlaying = localStorage.getItem('isPlaying');
  //   if (savedIsPlaying) {
  //     setIsPlaying(savedIsPlaying === 'true');
  //   }
  // }, []);


  const convertSecondsToMinutesString = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-gray-200 lg:p-8 flex flex-row rounded-lg overflow-hidden py-5">
      <audio ref={audioRef} src={audioSrc}></audio>
      <button
        aria-label='audioPlayer'
        title='CustomAudioPlayer'
        onClick={handlePlayPause}
        className="mr-4 sm:ml-0 ml-3 flex-shrink-0">
        {currentSong === audioSrc && isPlaying ? (
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

        <p className="text-gray-500 lg:ml-0 ml-44 lg:mt-0 mt-2">{convertSecondsToMinutesString(total_duration)}</p>
      </div>

      <div className="flex-shrink-0 sm:mt-0 mt-9">
        <DownloadAudio fileName={`rfai_${title}.mp3`} fileUrl={audioSrc} />
      </div>
    </div>
  );
};

export default AudioPlayer;
