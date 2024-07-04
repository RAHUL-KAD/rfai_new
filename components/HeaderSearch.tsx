import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    function menuExpand() {
        setOpen(!open);
    }

    const handleSearch = (optionalValue = '') => {
        // Extract the value from the search box (searchTerm)
        const valueToShare = searchTerm || optionalValue;

        // Perform the desired action, e.g., redirecting to another URL
        window.location.href = `/search/${valueToShare}`;
    };

    return (
        <header className="w-full mt-7 mx-auto rounded-3xl px-2">
            <div className="w-full mx-auto md:px-12 px-8 max-w-[100rem]">
                <div
                    x-data="{ open: false }"
                    className="relative flex flex-col max-w-full mx-auto md:items-center md:justify-between md:flex-row md:px-6"
                >
                    <div className="flex flex-row items-center justify-between lg:justify-start">
                        <Link href="/" className="flex space-x-2">

                            <Image
                                alt="header text"
                                src="/favicon.svg"
                                className="sm:w-12 sm:h-12 w-10 h-10"
                                width={25}
                                height={25}
                            />
                            <h1 className="sm:text-4xl text-4xl font-bold  tracking-tight">
                                Rfai &nbsp;
                                <sup >
                                    <small className="text-base">Beta</small>
                                </sup>
                            </h1>
                        </Link>

                        <button
                            onClick={menuExpand}
                            className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-black focus:outline-none focus:text-black lg:hidden"
                            id='expand-menu'
                            aria-label='Expand Menu'
                        >
                            <svg
                                className="w-6 h-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={open ? "hidden" : "inline-flex"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                                <path
                                    className={!open ? "hidden" : "inline-flex"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>

                    </div>

                    <nav
                        className={`flex-col items-center flex-grow ${open ? "flex" : "hidden"
                            } md:pb-0 md:flex md:justify-center md:flex-row mt-10 sm:mt-0`}
                    >

                        <div className="flex sm:flex-row flex-col items-start h-[10%] justify-start gap-10 w-[70%]">

                            <a
                                className="px-2 lg:px-6 py-2 md:px-3 font-medium text-lg text-[#333]"
                                href="/search/all"
                            >
                                Latest
                            </a>

                            <a
                                className="px-2 lg:px-6 py-2 md:px-3 font-medium text-lg text-[#333] hover:text-accent-400"
                                href="/search/all"
                            >
                                Hot
                            </a>
                            <a
                                className="px-2 lg:px-6 py-2 md:px-3  font-medium text-lg text-[#333] hover:text-accent-400"
                                href="/search/all"
                            >
                                Top
                            </a>
                            <a
                                className="px-2 lg:px-6 py-2 md:px-3  font-medium text-lg text-[#333] hover:text-accent-400"
                                href="/search/all"
                            >
                                Random
                            </a>

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
                                className="sm:w-[50%] h-[10%] rounded-3xl shadow-lg text-md font-semibold px-4 py-4 border-2 border-gray-400"
                            />
                        </div>
                    </nav>
                </div>

                {/* <div>
          <hr className="w-full h-0.5 border-t-0 mt-2 bg-slate-50 opacity-200 dark:opacity-200" />
        </div> */}
            </div>

        </header>
    );
}