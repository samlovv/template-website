// components/LoginCard.tsx
"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const router = useRouter()
  const backToHome = ()=>{
    router.push('/')
  }
    const [register, setRegister] = useState(true)
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className=" relative bg-[#1f1f1f] rounded-2xl p-8 w-full max-w-xl shadow-2xl border border-white/10">
        <button onClick={backToHome} className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-white text-center mb-5">{register ? "Join the Community":"Welcome Back"}</h1>
        <p className="text-gray-300 mb-6">
          Create beautiful UI elements and share them with 5+ developers
        </p>
        <ul className="text-gray-400 space-y-2 mb-8">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Create and share unlimited UI elements
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Get inspiration from thousands of designs
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Join a thriving community of creators
          </li>
        </ul>
        <div className="space-y-4 mt-12">
          <button
            onClick={() => signIn('github', { callbackUrl: "/" })}
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-linear-65 from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            <FaGithub className="text-xl" />
            {register?"Continue with GitHub" : 'Sign in with Github'}
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: "/" })}
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-linear-65 from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            <FaGoogle className="text-xl" />
            {register?"Continue with Google" : 'Sign in with Google'}
          </button>
        </div>
        
        <p className="text-gray-500 text-center mt-12 text-sm">
          {register?  "Already have an account?":"Don't have account yet?"}{' '}
          <button onClick={()=> setRegister((prev)=> !prev)} className="text-purple-400 cursor-pointer hover:underline">
            {register? "Sign in":"Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
