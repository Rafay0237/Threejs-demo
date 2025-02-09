"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronRight, Infinity, Zap, Shield } from "lucide-react"
import dynamic from "next/dynamic"
import type React from "react"

const InfinityLoop3DView = dynamic(() => import("@/components/InfinityLoopModel"), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const observers = sectionRefs.map(
      (ref, index) =>
        new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(index)
            }
          },
          { threshold: 0.5 },
        ),
    )

    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current)
      }
    })

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs[index].current) {
          observer.unobserve(sectionRefs[index].current)
        }
      })
    }
  }, [sectionRefs]) // Added sectionRefs to dependencies

  const modelStyle = {
    position: "fixed",
    left: "50%",
    top: "25%",
    width: "40vh",
    height: "40vh",
    transform: "translateX(0%)", // Centers the model initially
    transition: "all 0.5s ease-in-out",
    ...(activeSection === 1 && {
      transform: "translateX(50%) scale(0.70)", // Moves right and shrinks
    }),
    ...(activeSection === 2 && {
      transform: "translate(-200%, 50%) scale(0.90)", // Moves left and grows a bit
    }),
  };
  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 3D Model */}
      <div style={modelStyle as React.CSSProperties}>
        <InfinityLoop3DView />
      </div>

      {/* Hero Section */}
      <section
        ref={sectionRefs[0]}
        className="h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 overflow-hidden"
      >
        <div className="container mx-auto h-full">
          <div className="flex flex-col justify-center h-full">
            <div className="space-y-6 p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                InfinityLoop
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up animation-delay-200 text-gray-300">
                Embrace the future of endless possibilities
              </p>
              <button className="animate-fade-in-up animation-delay-400 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded">
                Explore More <ChevronRight className="inline-block ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs[1]} className="min-h-screen py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-left">Infinite Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Infinity className="h-12 w-12 mb-4" />}
              title="Endless Adaptability"
              description="Our InfinityLoop technology adapts to your needs, providing limitless applications."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 mb-4" />}
              title="Quantum-Powered"
              description="Harness the power of quantum computing for unparalleled performance and efficiency."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 mb-4" />}
              title="Unbreakable Security"
              description="Advanced encryption ensures your data remains safe in the infinite digital realm."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={sectionRefs[2]} className="min-h-screen py-20 bg-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Loop into the Future?</h2>
          <p className="text-xl mb-12">Get your InfinityLoop today and experience limitless potential.</p>
          <button className="bg-white text-black font-bold py-3 px-6 rounded-full text-lg animate-pulse">
            Order Now <ChevronRight className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg transition-transform hover:scale-105">
      {icon}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-300">{description}</p>
    </div>
  )
}

