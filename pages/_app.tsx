
import type { AppProps } from "next/app";
import "../styles/globals.css";
import ErrorBoundary from "./ErrorBoundry";
import React, { lazy } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AudioProvider } from '../context/AudioContext';
import AudioPlayer from "../components/AudioPlayerFixed";

const Footer = lazy(() => import('../components/Footer'));

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ErrorBoundary fallback="There was an error while processing">
        <AudioProvider>
          <Component {...pageProps} />
          {/* <Footer /> */}
          <AudioPlayer />
        </AudioProvider>
      </ErrorBoundary>

    </>
  );
}

export default MyApp;
