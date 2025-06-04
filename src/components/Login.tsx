"use client"

import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function LoginComp() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Join the Community</h1>
        <p className="text-gray-300 mb-6">
          Create beautiful UI elements and share them with 100,000+ developers
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
        <div className="space-y-4">
          <button
            onClick={() => signIn('github')}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            <FaGithub className="text-xl" />
            Continue with GitHub
          </button>
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            <FaGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>
        <p className="text-gray-500 text-center mt-6 text-sm">
          By continuing, you agree to our{' '}
          <a href="#" className="text-purple-400 hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-400 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p className="text-gray-500 text-center mt-2 text-sm">
          Already have an account?{' '}
          <a href="#" className="text-purple-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}