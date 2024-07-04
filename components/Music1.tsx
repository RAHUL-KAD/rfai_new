import audioData from "../public/landingPageData.json";
import React, { ComponentType, lazy, Suspense, useState } from "react";

import { TbArrowRightTail } from "react-icons/tb";

type LandingPageData = {
  title: string;
  url: string;
  genera: string;
  duration: number;
}[];



const AudioPlayer3 = lazy(() => import("./AudioPlayer5"));

// to not limit how many to render when search is not empty
// https://chat.openai.com/share/cc9b37c3-9516-4739-87e9-424f4e2093db

export default function Music1() {
  const [searchTerm, setSearchTerm] = useState("jazz");

  // Filter audioData based on the search term
  const reversedAudioData = [...audioData].reverse();

  // const filteredAudioData = reversedAudioData.filter((audio) =>
  //   audio.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   audio.genera.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   audio.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSearch = (optionalValue = '') => {
    // Extract the value from the search box (searchTerm)
    const valueToShare = searchTerm || optionalValue;

    // Perform the desired action, e.g., redirecting to another URL
    window.location.href = `/search/${valueToShare}`;
  };

  // const limitedAudioData = filteredAudioData.slice(0, 8);
  const limitedAudioData = reversedAudioData.slice(0, 20)

  return (
    <div className="mb-10">
      <div className="mx-auto flex max-w-full flex-col items-center justify-center">
        {/* <p className="mt-20 mb-5 text-4xl font-bold tracking-tight text-[#333] sm:text-5xl">
          Browse Music
          <br className="hidden sm:inline lg:hidden" />
        </p> */}
        {/* Add the search input */}

        <div className="flex items-center justify-center gap-10 w-[100%]">
          <input
            type={"search"}
            placeholder="describe your music..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            // onClick={handleSearch}
            className="sm:w-[60%] rounded-3xl shadow-xl text-md font-semibold px-4 py-4 border-2 border-gray-400 mt-10 sm:mb-10"
          />

          {/* <button
            onClick={() => handleSearch()}
            className="bg-[#333] hover:bg-gray-600 h-[10%] text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button> */}
        </div>

        <div className="mb-5 flex-col hidden lg:block justify-start items-start">

          <a href="/search/Indie Folk" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300">Indie Folk</a>
          <a href="/search/Lofi" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">lofi</a>
          <a href="/search/Classical" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">Classical</a>
          <a href="/search/Jazz" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200dark:bg-gray-700 dark:text-gray-300">Jazz</a>
          <a href="/search/Funk" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">Funk</a>
          <a href="/search/World" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">World</a>
          <a href="/search/Ambient" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">Ambient</a>
          <a href="/search/Electronic" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">Electronic</a>
          <a href="/search/Chiptune" className="bg-gray-100 ml-5 cursor-pointer text-gray-800 text-lg font-medium me-2 px-2.5 py-1 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">Chiptune</a>

        </div>
      </div>

      <div className="flex flex-col ml-10 sm:mt-5 lg:mt-0 md:mt-0 mt-5">
        <p>(1000 results found)</p>
      </div>

      <div className="grid w-[100%] p-5 sm:grid-cols-3 sm:gap-10 lg:gap-10 md:gap-5 gap-5">
        {limitedAudioData.map((audio, index) => (
          <Suspense key={index} fallback={<div>Loading...</div>}>
            {/* <AudioPlayer2 url={audio.url} title={audio.title} genera={audio.genera}/> */}
            <AudioPlayer3 audioSrc={audio.url} title={audio.title} genre={audio.genera} total_duration={audio.duration} />
          </Suspense>
        ))}
      </div>
      <div className="flex justify-end mr-5">
        <a href="/search/all" className="text-[#333] font-medium text-lg hover:underline">Explore all music →</a>
      </div>
    </div>
  );
}
