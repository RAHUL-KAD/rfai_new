import React, { lazy } from "react";

import { NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import Header from "../components/Header";


const Music1 = lazy(() => import("../components/Music1"));

const Home: NextPage = () => {
  
  return (
    <div className="mx-auto flex max-w-full flex-col items-center justify-center py-2">
      <Head>
        <title>Rfai | Royalty Free AI Generated Music </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-green-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <Header />
      <main className="max-w-full px-4">
        <div className="mt-5 sm:mt-10">
          {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}
          <h1 className="font-display mx-auto max-w-4xl text-center text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            <span className="relative text-[#333] sm:whitespace-nowrap">
              <span className="relative mr-2">
                Royalty-Free AI Generated Music
              </span>
            </span>
          </h1>

          <div className="mt-5 grid sm:mt-10 sm:grid-cols-3">
            <p className="mx-auto text-lg leading-7 text-[#333] sm:text-xl">
              🎵 Unlimited music downloads
            </p>
            <p className="mx-auto text-lg leading-7 text-[#333] sm:text-xl">
              🚀  No Sign in required
            </p>
            
            <p className="mx-auto text-lg leading-7 text-[#333] sm:text-xl">
              💸 Commercial use
            </p>
          </div>

          </div>
        
      </main>
      <Music1 />
    </div>
  );
};

export default Home;
