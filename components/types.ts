export type PlayerProps = {
    title: string;
    url: string;
    genera?: string;
    uuid?: string;
  };


export interface CurrentMusicType extends PlayerProps {
    duration?: number;
    curTime?: number;
    isPlaying?: boolean;
  }
  export type PlayerContextType = {
    currentMusic: CurrentMusicType;
    setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
    playList: PlayerProps[];
  };