import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioContextType {
  currentSong: string;
  title: string;
  genre: string;
  total_duration: number;
  isPlaying: boolean;
  currentTime: number;
  setCurrentSong: (song: string, title: string, genre: string, total_duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;

}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSongState] = useState<string>('https://quelutgylzztkdaisfbh.supabase.co/storage/v1/object/sign/rfai-audio-files/prod/Electronic Dreams__1e347fb1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZmFpLWF1ZGlvLWZpbGVzL3Byb2QvRWxlY3Ryb25pYyBEcmVhbXNfXzFlMzQ3ZmIxLm1wMyIsImlhdCI6MTcwMjEzMjAxMiwiZXhwIjoyNzAyMTMyMDEyfQ.tN7qlq46MBHaDgtHXZeEi6-Ii_7LzaFtX8uqGrqj-Ms');
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [total_duration, setTotalDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const setCurrentSong = (song: string, title: string, genre: string, total_duration: number) => {
    setCurrentSongState(song);
    setTitle(title);
    setGenre(genre);
    setTotalDuration(total_duration);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  useEffect(() => {
    const savedSong = localStorage.getItem('currentSong');
    const savedTitle = localStorage.getItem('title');
    const savedGenre = localStorage.getItem('genre');
    const savedDuration = localStorage.getItem('total_duration');
    const savedIsPlaying = localStorage.getItem('isPlaying');
    const savedCurrentTime = localStorage.getItem('currentTime');

    if (savedSong) {
      setCurrentSongState(savedSong);
    }
    if (savedTitle) {
      setTitle(savedTitle);
    }
    if (savedGenre) {
      setGenre(savedGenre);
    }
    if (savedDuration) {
      setTotalDuration(Number(savedDuration));
    }
    if (savedIsPlaying) {
      setIsPlaying(savedIsPlaying === 'true');
    }
    if (savedCurrentTime) {
      setCurrentTime(parseFloat(savedCurrentTime));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('currentSong', currentSong);
    localStorage.setItem('title', title);
    localStorage.setItem('genre', genre);
    localStorage.setItem('total_duration', total_duration.toString());
    localStorage.setItem('isPlaying', isPlaying.toString());
    localStorage.setItem('currentTime', currentTime.toString());


  }, [currentSong, title, genre, total_duration, isPlaying, currentTime]);

  return (
    <AudioContext.Provider
      value={{ currentSong, title, genre, total_duration, currentTime, isPlaying, setCurrentSong, setIsPlaying, setCurrentTime }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
