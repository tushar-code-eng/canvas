"use client"
import Link from "next/link"

import { signIn } from "next-auth/react"

import canvasHero from '../../assets/landingPage/canvasHero.png'
import Image from "next/image"

export default function Hero() {

    return (
        <section id="hero" className="bg-neutral-900 min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate__animated animate__fadeInDown animate__fadeIn">
                        Flowcharts, Designs and Collaboration
                        <br />
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                            Together in real time
                        </span>
                    </h1>
                    <p className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
                        Create stunning and modern flowcharts, shapes, and designs with real-time collaboration. Work seamlessly with your
                        team, anywhere in the world.
                    </p>
                    <div className="flex justify-center space-x-4 animate__animated animate__fadeInUp animate__delay-1s animate__fadeIn">
                        <div
                            className="cursor-pointer bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        >
                            Start Creating
                        </div>
                        <Link
                            href="#"
                            className="bg-neutral-800 text-white px-8 py-3 rounded-lg hover:bg-neutral-700 transition-colors font-medium"
                        >
                            Watch Demo
                        </Link>
                    </div>
                </div>

                <div className="mt-16 relative animate__animated animate__fadeIn animate__delay-2s">
                    <div className="bg-neutral-800/50 backdrop-blur-sm p-4 rounded-xl shadow-2xl">
                        <Image className="rounded-xl" src={canvasHero.src} alt="" />
                        {/* <div className="relative bg-neutral-900 rounded-lg p-8 aspect-video flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-lg"></div>
                            
                        </div> */}
                    </div>
                </div>
            </div>

            {/* <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
                    <path
                        fill="#171717"
                        fillOpacity="1"
                        d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div> */}
        </section>
    )
}

