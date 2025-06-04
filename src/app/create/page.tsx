'use client'

import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useLoading } from '@/components/loading-context';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeType from '@/components/CodeType';
import Htmlicon from "@/assets/icons/html-5-svgrepo-com.svg"
import Cssicon from "@/assets/icons/css3-svgrepo-com.svg"
import tailwindicon from "@/assets/icons/tailwind-css-svgrepo-com.svg"
import Image from 'next/image';
import {LayoutGrid} from 'lucide-react'
import { useRouter } from 'next/navigation';

const DEFAULT_HTML = `<div class="text-3xl font-bold text-blue-500">
  Hello World!
</div>`;
const DEFAULT_CSS = `body { padding: 20px; font-family: sans-serif; }`;



export default function Home() {

  

  const router = useRouter()


  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [useTailwind, setUseTailwind] = useState(true);
  const [category, setCategory] = useState<string>('Navbar');
  const [typeVisibility, setTypeVisibility] = useState<boolean>(true)

  
  useEffect(() => {
    if (useTailwind) {
      setCssCode('');
    }
  }, [useTailwind]);


  const { show, hide } = useLoading();

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
          ${cssCode}</style>
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


  const publish = async () => {
    show();
    
    const res = await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: htmlCode,
        css: cssCode,
        tailwind: useTailwind,
        category,
      }),
    });
    
    hide();
    const data = await res.json();
    
    console.log(data);
    router.push('/profile')
  };

  return (
    <div className="min-h-screen flex flex-col gap-6">
      {typeVisibility ? <CodeType setVisibility={setTypeVisibility} category={category} setCategory={setCategory} tailwind={useTailwind} setTailwind={setUseTailwind}/> :""}
      {/* IFRAME — ВЕРХ */}
      <div className="h-[500px] w-full mt-24 px-[30px]">
        <iframe
          srcDoc={generateSrcDoc()}
          className="w-full h-full bg-[#f2f2f2] rounded-2xl border-none "
          sandbox="allow-scripts"
          title="preview"
        />
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


        {/* Справа — inputs */}
        <div className=" px-4 p-2 mb-4 rounded-2xl flex flex-col  md:flex-row justify-between bg-[#212121]">
          <div className='flex gap-4 items-center justify-between'>
            <button className='transition-all duration-10 hover:bg-white/10 flex gap-2 p-[8px] px-[10px] cursor-pointer shadow-2xl rounded-md font-sans' onClick={()=> setTypeVisibility(true)}><LayoutGrid/>Change Type</button>
            <h1 className=' text-[#898989] font-bold'>{category}</h1>
          </div>
            
          
          <div className=" mt-5 md:mt-0 flex-col flex md:flex-row">
            
            <button
            onClick={publish}
            className="bg-blue-700 hover:bg-blue-800 px-6 py-2 cursor-pointer text-white font-semibold rounded-md shadow-md transition duration-200"
            >
            🚀 Submit for review
          </button>
          </div>
           
        </div>
      </div>
    </div>
  );
}
