'use client';

import {  useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

export const metadata = {
  title: 'Page Not Found | TemplateUI',
  description: 'The page you’re looking for doesn’t exist. Head back to the homepage or explore trending templates.',
}


export default function NotFound() {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const buttonRef = useRef(null)
  const lineRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: 'power3.out' }
    )
    gsap.fromTo(
      lineRef.current,
      { width: 0 },
      { width: '100%', duration: 1, delay: 0.9, ease: 'power2.out' }
    )
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c0c0c] px-4 text-white relative">
      {/* Top SVG Line */}
      <div className="absolute top-10 w-full flex justify-center">
        <div ref={lineRef} className="h-[1px] bg-[#333] max-w-xl" />
      </div>

      {/* Icon */}
      <div className="mb-6 text-[#a983ff]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#a983ff"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" stroke="#22ff00" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="text-4xl sm:text-5xl font-bold tracking-tight text-[#22ff00] text-center"
      >
        Page Not Found
      </h1>

      {/* Description */}
      <p
        ref={descRef}
        className="mt-4 text-lg text-[#999] text-center max-w-md"
      >
        The page you're looking for doesn’t exist or has been removed.
      </p>

      {/* Back Button */}
      <button
        ref={buttonRef}
        onClick={() => (window.location.href = '/')}
        className="mt-8 px-6 py-2 rounded bg-[#22ff00] text-[#0c0c0c] font-semibold hover:bg-[#1bcc00] transition"
      >
        Go Home
      </button>
    </div>
  )
}
