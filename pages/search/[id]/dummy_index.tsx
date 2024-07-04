import Head from "next/head";
import { useRouter } from "next/router";
import audioData from "../../../public/audioData.json";
import Header from "../../../components/Header";
import { Suspense } from "react";
import { CurrentMusicType, PlayerContextType } from "../../../components/types";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { defaultMusic, secondsToMinutes } from "../../../components/utils";
// import Music2 from "./Music2";
import DownloadAudio from "../../../components/DownloadAudio";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef } from "react";
import {
    TbArrowsShuffle2,
    TbPlayerPause,
    TbPlayerPlay,
    TbPlayerSkipBack,
    TbPlayerSkipForward,
    TbVolume,
    TbVolume3,
} from "react-icons/tb";


export default function SearchFunction() {
    const router = useRouter();
    const { id } = router.query;

    // Convert id to string if it's an array
    const searchTerm = Array.isArray(id) ? id[0] : id ?? '';

    // Filter audioData based on the search term
    const reversedAudioData = [...audioData].reverse();

    const filteredAudioData = reversedAudioData.filter((audio) =>
        audio.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audio.genera.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audio.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // this is for usePlayer
    const PlayerContext = createContext<PlayerContextType>({
        playList: filteredAudioData,
        currentMusic: defaultMusic,
        setCurrentMusic: () => { }
    })

    const [current, setCurrent] = useState<CurrentMusicType>(defaultMusic);

    // update(volume and play/pause) and replace currentMusic
    const setCurrentMusic = (val: Partial<CurrentMusicType>, replace = false) => {
        if (replace && val.url !== current.url) {
            setCurrent(val as CurrentMusicType);
        } else {
            setCurrent((prev) => ({ ...prev, ...val }));
        }
    };


    // this is for Playground
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);
    const [volume, setVolume] = useState(100);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //   close volume on click outside
    const volumeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const closeVolume = (e: any) => {
            if (!volumeRef.current?.contains(e.target)) setIsVolumeOpen(false);
        };
        document.addEventListener("click", closeVolume, true);
        return () => {
            document.removeEventListener("click", closeVolume, true);
        };
    }, []);

    // const { currentMusic, setCurrentMusic, playList } = usePlayer();
    // const audioRef = useRef<HTMLAudioElement>(new Audio());
    // const audioRef = useRef<HTMLAudioElement>();
    const audioRef = useRef<HTMLAudioElement>(null!);

    useEffect(() => {
        setIsLoading(true);

        audioRef.current = new Audio(current.url)

        // volume chnager
        audioRef.current.addEventListener('volumechange', (e: any) => {
            setVolume(+e.target.volume)
        })

        // play and pause audio
        audioRef.current.addEventListener("play", () => {
            setCurrentMusic({ isPlaying: true });
            setIsLoading(false);
        });

        audioRef.current.addEventListener("pause", () => {
            setCurrentMusic({ isPlaying: false });
            setIsLoading(false);
        });

        // // got to the next music when current one finished
        // audioRef.current.addEventListener("ended", (e: any) => {
        //     skipNext(new URL(e.target.src).pathname);
        // });


        // lets trigger when audio is ready
        audioRef.current.addEventListener("canplay", () => {
            audioRef.current?.play();
        });

        // time and duration
        audioRef.current.addEventListener("loadedmetadata", (e: any) => {
            setCurrentMusic({
                curTime: e.target.currentTime,
                duration: e.target.duration,
            });
        });

        audioRef.current.addEventListener("timeupdate", (e: any) => {
            setCurrentMusic({
                curTime: e.target.currentTime,
            })
        });
        return () => {
            audioRef.current?.pause();
            // audioRef.current?.removeEventListener("volumechange", handleVolumeChange);
            // audioRef.current?.removeEventListener("play", handlePlay);
            // audioRef.current?.removeEventListener("pause", handlePause);
            // audioRef.current?.removeEventListener("canplay", handleCanPlay);
            // audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
            // audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        };
    
    }, [current.url]);

const handlePlayPauseClick = () => {
    audioRef.current?.pause?.();
    audioRef.current?.play?.();
};


const skipNext = (url: string) => {
    const idx = filteredAudioData.findIndex((m) => m.url === url);
    const nextIndex = (idx + 1) % filteredAudioData.length;
    setCurrentMusic(filteredAudioData[nextIndex], true);
};

const skipPrev = (url: string) => {
    const idx = filteredAudioData.findIndex((m) => m.url === url);
    const prevIndex = idx === 0 ? filteredAudioData.length - 1 : idx - 1;
    setCurrentMusic(filteredAudioData[prevIndex]);
};



return (
    <div className="py-2 mx-auto flex flex-col items-center justify-center">
        <Head>
            <title>Download {id} Royalty-Free music</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <div>
            <div className="flex">

                <p>{filteredAudioData.length}</p>
                {/* {filteredAudioData.map((audio, index) => (
                        <Suspense key={index} fallback={<div>Loading...</div>}>
                            <p> title={audio.title}</p>
                        </Suspense>
                    ))} */}

                <PlayerContext.Provider
                    value={{ currentMusic: current, setCurrentMusic, playList: filteredAudioData }}
                >
                    <div className="mt-10 overflow-auto ">
                        <div className="grid grid-cols gap-4 mx-4 md:mx-auto mt-6 mb-20">
                            {filteredAudioData.map((music) => {
                                const isPlaying = current.url === music.url;
                                return (
                                    <div
                                        className={`${isPlaying ? " border-purple-700" : "border-transparent"
                                            } flex gap-2 text-xs relative transition-shadow duration-300 shadow-lg hover:shadow-none bg-[#333] rounded-2xl overflow-hidden text-white border-2 border-dashed`}
                                    >

                                        <button key={music.uuid} onClick={() => {
                                            setCurrentMusic(music, true);
                                        }} className="sm:w-1/12 w-1/6 h-24 flex justify-center cursor-pointer items-center text-3xl bg-black/10">
                                            {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
                                        </button>
                                        <div className="w-8/12 flex flex-col ml-10 gap-2 justify-center">
                                            <h6 className="font-semibold sm:text-lg text-[15px]">{music.title}</h6>
                                            <p className="text-sm text-gray-400">{music.genera}</p>
                                            {/* <p className="text-sm text-gray-400">{secondsToMinutes(currentMusic.duration)}</p> */}
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center">
                                            <DownloadAudio fileName={`rfai_${music.title}.mp3`} fileUrl={music.url} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {current.url &&
                        <div className="fixed w-screen bottom-0 inset-x-0 ">
                            <div className="py-3 bg-[#333] backdrop-blur-xl  text-white shadow-lg shadow-purple-50">
                                <div className="container mx-auto px-3 lg:px-0 lg:flex">

                                    {/* Play/pause or next/prev icons */}
                                    <div className="flex items-center justify-center gap-3 lg:w-2/12">
                                        <button onClick={() => skipPrev(current.url)}>

                                            <TbPlayerSkipForward size={20} />
                                        </button>

                                        <button
                                            onClick={handlePlayPauseClick}
                                            className="rounded-full p-1 border border-white-700"
                                        >
                                            {isLoading ? (
                                                // Add your loading spinner component here
                                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                                            ) : current.isPlaying ? (
                                                <TbPlayerPause size={26} />
                                            ) : (
                                                <TbPlayerPlay size={26} />
                                            )}

                                        </button>

                                        <button onClick={() => skipNext(current.url)} >
                                            <TbPlayerSkipForward size={20} />
                                        </button>
                                    </div>

                                    {/* title */}
                                    <div className="hidden lg:flex items-center lg:w-3/12 gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h6 className="text-md font-semibold">{current.title}</h6>
                                            <span className="tet-sm">{current.genera}</span>
                                        </div>
                                    </div>

                                    {/* progress */}
                                    <div className="hidden lg:flex w-6/12 flex-col gap-1 justify-center">
                                        <Slider
                                            trackStyle={{ background: "rgb(126 34 206)" }}
                                            handleStyle={{
                                                border: "2px solid rgb(126 34 206)",
                                                background: "rgb(126 34 206)",
                                                boxShadow: "none",
                                                opacity: 1,
                                            }}
                                            min={0}
                                            max={current.duration}
                                            value={current.curTime}
                                            onChange={(val) => {
                                                if (audioRef.current) {
                                                    audioRef.current.currentTime = +val;
                                                }
                                            }}
                                        />
                                        <div className="flex justify-between text-xs">
                                            <span>{secondsToMinutes(current.curTime)}</span>
                                            <span>{secondsToMinutes(current.duration)}</span>
                                        </div>
                                    </div>

                                    {/* settings */}
                                    <div className="hidden lg:flex justify-end gap-3 lg:w-1/12">
                                        <div className="relative flex items-center h-full" ref={volumeRef}>
                                            {isVolumeOpen && (
                                                <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8 h-20 rounded-2xl overflow-hidden bg-gray-300 py-4 justify-center">
                                                    <Slider
                                                        vertical
                                                        min={0}
                                                        max={1}
                                                        step={0.01}
                                                        // ref={volumeRef}
                                                        value={volume}
                                                        onChange={(val) => {
                                                            if (audioRef.current) {
                                                                audioRef.current.currentTime = +val;
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
                                                {volume === 0 ? <TbVolume3 size={24} /> : <TbVolume size={24} />}
                                            </button>
                                        </div>

                                        <DownloadAudio fileName={`rfai_${current.title}.mp3`} fileUrl={current.url} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </PlayerContext.Provider>

            </div>
        </div>
    </div>
)
}