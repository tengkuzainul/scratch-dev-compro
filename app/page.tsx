"use client";

import Navbar from "@/components/Navbar";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { CaretRight } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0d0a14] overflow-hidden text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "stroke-gray-500/20",
          "mask-[radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Hero Section */}
      <main className="grow flex flex-col items-center justify-center px-4 pt-36 pb-16 text-center z-10 max-w-4xl mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center p-[3px] pr-4 rounded-full border border-white/10 bg-[#161224] backdrop-blur-md text-xs mb-8 relative overflow-hidden">
          <span className="bg-[#7c3aed] text-white font-semibold px-3 py-1 rounded-full text-[10px] sm:text-xs tracking-wide mr-2">
            Only 2 spots left this month
          </span>
          <span className="text-zinc-300 font-medium hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            Book an intro call <CaretRight size={12} weight="bold" className="text-purple-400" />
          </span>
          <BorderBeam
            duration={6}
            size={120}
            reverse={true}
            borderWidth={1.5}
            className="from-transparent via-[#E11D48] to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            reverse={true}
            size={120}
            borderWidth={1.5}
            className="from-transparent via-blue-500 to-transparent"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#a78bfa] leading-[1.1] mb-6 max-w-3xl">
          We Build Scalable Software for Startup
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">
          Leading full-stack developers specializing in custom website and mobile app solutions
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 mb-12 justify-center w-full sm:w-auto">
          <button className="bg-white hover:bg-zinc-100 text-black font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm sm:text-base">
            View our portfolio
          </button>
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-purple-600/20 cursor-pointer text-sm sm:text-base">
            Book a Call
          </button>
        </div>

        {/* Overlapping Avatars */}
        <div className="flex -space-x-3 justify-center items-center">
          {[
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80"
          ].map((url, index) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={url}
                alt={`Team member ${index + 1}`}
                className="w-12 h-12 rounded-full border-2 border-[#0d0a14] object-cover hover:scale-110 hover:z-10 transition-transform duration-200 cursor-pointer"
              />
            );
          })}
        </div>
      </main>

      {/* Navigation */}
      <Navbar />
    </div>
  );
}

