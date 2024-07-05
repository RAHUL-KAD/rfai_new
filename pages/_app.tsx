import type { AppProps } from "next/app";
import "../styles/globals.css";
import ErrorBoundary from "../components/ErrorBoundry";
import React, { lazy } from 'react';
import { AudioProvider } from '../context/AudioContext';
import AudioPlayer from "../components/AudioPlayerFixed";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ErrorBoundary fallback="There was an error while processing">
        <AudioProvider>
          <Component {...pageProps} />
          <AudioPlayer />
        </AudioProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
