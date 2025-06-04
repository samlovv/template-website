import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import svg from '@/assets/svg/undraw_dev-productivity_5wps.svg'

export const metadata = {
  title: 'About Us | TemplateUI',
  description: 'Learn more about what we do at MySite.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen mt-20 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10">About Me</h1>

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            <p className="text-lg leading-relaxed">
              I'm a passionate full-stack developer dedicated to building high-quality web experiences.
              My mission is to create innovative digital products that make a difference.
            </p>
          </div>

          <Image src={svg} alt='developerphoto' className='hidden md:flex w-60 h-60'/>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">My Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-[#141414] rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Creativity</h3>
              <p>I love finding elegant and innovative solutions to complex problems.</p>
            </div>
            <div className="p-6 bg-[#141414] rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Dedication</h3>
              <p>I take pride in my work and strive for excellence in every project.</p>
            </div>
            <div className="p-6 bg-[#141414] rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p>I'm constantly learning and pushing my limits as a developer and creator.</p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Let’s Connect</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            I'm always open to collaboration, freelance opportunities, or just chatting about tech and innovation.
          </p>
          <Link href='/contact' className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition">
            Contact Me
          </Link>
        </section>
      </div>
    </div>
  );
}
