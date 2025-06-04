'use client'

import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10 border-neutral-800 bg-[#0c0c0c] ">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
        <div className="flex gap-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contacts</Link>
        </div>

        <p className="text-center text-xs md:text-sm">&copy; {new Date().getFullYear()} TemplateUI. All rights reserved</p>

        <div className="flex gap-4 text-lg">
          <a href="https://github.com/samlovv" target="_blank" className="hover:text-white transition"><FaGithub /></a>
          <a href="https://instagram.com/samlovv" target="_blank" className="hover:text-white transition"><FaInstagram /></a>
          <a href="https://linkedin.com/in/samlovv" target="_blank" className="hover:text-white transition"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  )
}
