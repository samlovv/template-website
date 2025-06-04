'use client'
/* import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'

type Props = {
  value: string
  onChange: (val: string) => void
  lang: 'html' | 'css'
}

export default function TemplateEdit({ value, onChange, lang }: Props) {
  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[lang === 'html' ? html() : css()]}
      onChange={(val) => onChange(val)}
    />
  )
}
 */

import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useLoading } from './loading-context';
import axios from 'axios';
import Image from 'next/image';
import { dracula } from '@uiw/codemirror-theme-dracula';
import Htmlicon from "@/assets/icons/html-5-svgrepo-com.svg"
import Cssicon from "@/assets/icons/css3-svgrepo-com.svg"
import tailwindicon from "@/assets/icons/tailwind-css-svgrepo-com.svg"
import Link from 'next/link';
import {LayoutGrid} from 'lucide-react'

const DEFAULT_HTML = `<div class="text-3xl font-bold text-blue-500">
  Hello World!
</div>`;
const DEFAULT_CSS = `body { padding: 20px; font-family: sans-serif; }`;

export default function TemplateEdit({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [useTailwind, setUseTailwind] = useState(true);
  const [category, setCategory] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 🆕

  const { show, hide } = useLoading();


  type User = {
    nickname: any;
    image: string;
  };

  


  useEffect(() => {
    async function fetchData() {
      try {
        show();
        const res = await fetch(`/api/templates/${id}`);
        const data = await res.json();
        setCssCode(data.css || '');
        setHtmlCode(data.html || '');
        setUseTailwind(data.tailwind);
        setCategory(data.category);
        setUser(data.user);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false); // 🆕 данные загружены
        hide();
      }
    }

    fetchData();
  }, [id]);

  
  

  const generateSrcDoc = () => {
    const tailwindCDN = `<script src="https://cdn.tailwindcss.com"></script>`;
    return `
      <html>  
        <head>
          <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            overflow: hidden;
          }
          ${cssCode}
          </style>
          ${useTailwind ? tailwindCDN : ''}
        </head>
        <body>
          ${htmlCode}
        </body>
      </html>
    `;
  };

  const getEditor = () => {
    if (useTailwind) {
      return (
        <CodeMirror
          className="text-base rounded-md h-[500px] overflow-hidden"
          value={htmlCode}
          height="100%"
          extensions={[html()]}
          theme={dracula}
          onChange={(val) => setHtmlCode(val)}
        />
      );
    }

    switch (activeTab) {
      case 'html':
        return (
          <CodeMirror
            className="text-base rounded-xl h-[500px] overflow-hidden"
            value={htmlCode}
            height="100%"
            extensions={[html()]}
            theme={dracula}
            onChange={(val) => setHtmlCode(val)}
          />
        );
      case 'css':
        return (
          <CodeMirror
            className="text-base rounded-xl h-[500px] overflow-hidden"
            value={cssCode}
            height="100%"
            extensions={[css()]}
            theme={dracula}
            onChange={(val) => setCssCode(val)}
          />
        );
    }
  };


  

  return (
    <div className="min-h-screen flex flex-col gap-6">
      {user && (
        <div className='mt-15 flex gap-2 px-[30px] items-center justify-end'>
        <h1 className='md:text-lg text-sm'><span className='text-[#cfcfcf]'>{category}&nbsp;</span>by <Link className='hover:underline' href={`/profile/${user?.nickname}`}>{user?.nickname}</Link></h1>
        {user?.image && (
          <Image src={user?.image} width={100} height={100} className='w-10 h-10 rounded-sm' alt="Some image" />
        )}
      </div>
      )}
      
      {/* IFRAME — ВЕРХ */}
      <div className="h-[500px] w-full mt-4 px-[30px]">
        {!isLoading ? (
          <iframe
            srcDoc={generateSrcDoc()}
            className="w-full h-full bg-[#f2f2f2] rounded-2xl border-none "
            sandbox="allow-scripts"
            title="preview"
          />
        ) : (
          <div className="text-white flex justify-center items-center h-full">
            Loading...
          </div>
        )}
      </div>

      {/* НИЖНЯЯ ЧАСТЬ: редактор и inputs */}
      <div className="flex flex-col px-[30px] gap-6">
        {/* Слева — редактор */}
        <div className=" flex flex-col rounded-2xl border-gray-300 bg-[#212121]">
          {useTailwind ? (
            <div className="p-4 text-white flex items-center font-semibold text-lg"><Image src={Htmlicon} alt='htmlicon' height={23} width={23}/>HTML + <Image src={tailwindicon} alt='tailwindicon' height={23} width={23}/>Tailwind</div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex pl-10 rounded-2xl items-center p-2 bg-[#212121]">
                {[{name:'html', icon: <Image src={Htmlicon} alt='' height={23} width={23}/>}, {name:'css', icon: <Image src={Cssicon} height={23} width={23} alt=''/>}].map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name as 'html' | 'css')}
                    className={`flex gap-1  text-white cursor-pointer items-center font-sans px-5 py-1.5 text-sm ${tab.name == 'html' ? 'rounded-l-md' : "rounded-r-md"} transition-all duration-200 ${
                      activeTab === tab.name
                        ? 'bg-black  shadow border-2 border-blue-700'
                        : 'bg-[#1d1d1d] border-1 border-white/50 hover:border-white hover:bg-[#2c2c2c]'
                    }`}
                  >
                    {tab.icon}
                    {tab.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="flex-1 overflow-auto p-1">
            {getEditor()}
          </div>
        </div>


        
      </div>
    </div>
  );
}

