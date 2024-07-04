import Head from "next/head";
import { useRouter } from "next/router";
// import audioData from "../../../public/detailed_data.json";
import HeaderSearch from "../../../components/HeaderSearch";

import AudioPlayer from "../../../components/AudioPlayer4";
import { Suspense, useState } from "react";

export default function SearchFunction() {



    const router = useRouter();
    const { id } = router.query;

    // Convert id to string if it's an array
    const searchTerm = Array.isArray(id) ? id[0] : id ?? '';

    // Filter audioData based on the search term
    // const reversedAudioData = [...audioData].reverse();

    // const filteredAudioData = reversedAudioData.filter((audio) =>
    //     audio.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     audio.genera.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     audio.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    //     audio.type.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (

        <div className="py-2 mx-auto flex flex-col items-center justify-center">
            <Head>
                <title>Download {id} Royalty-Free music</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderSearch />
            <div className="flex mt-16 flex-col">

                <div className="ml-5">
                    <p className="font-medium text-lg mb-5">Download {id} Royalty-Free music</p>
                </div>


                {/* <div className="flex flex-col ml-5 sm:mt-5 lg:mt-0 md:mt-0">
                    <p>({filteredAudioData.length} results found)</p>
                </div>
                <div className="grid w-[100%] p-5 sm:grid-cols-2 sm:gap-10 lg:gap-10 md:gap-5 gap-5">
                    {filteredAudioData.map((audio, index) => (
                        <Suspense key={index} fallback={<div>Loading...</div>}>
                            <AudioPlayer key={index} audioSrc={audio.uuid} title={audio.title} genre={audio.genera} total_duration={audio.duration} />
                        </Suspense>
                    ))}
                </div> */}
            </div>
        </div>
    )

}