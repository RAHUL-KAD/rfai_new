import { NextPageContext } from 'next';
import React from 'react';

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col space-y-5">
      <h1 className="mx-auto max-w-4xl font-display text-2xl font-bold tracking-normal text-slate-900 sm:text-4xl mb-5 text-center">
        {statusCode
          ? `An error ${statusCode} occurred on the server`
          : 'An error occurred on the client'}
      </h1>
      <button
        className='items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white'
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
