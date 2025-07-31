import TemplateComp from '@/components/TemplateComp'
import React from 'react'
import { Suspense } from "react";

export const metadata = {
  title: 'Templates Gallery | TemplateUI',
  description: 'Explore a collection of modern website templates. Browse, preview, and get inspired by community-generated designs.',
}

 const Templates = async () => {
  let templates = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/verified`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('API error');

    templates = await res.json();
  } catch (e) {
    console.error('Ошибка при загрузке шаблонов:', e);
    // Можешь здесь вернуть пустой массив или другой fallback
  }

  return (
    <div className='my-20 px-6 md:px-12'>
      <Suspense fallback={<div>Loading Templates...</div>}>
        <TemplateComp data={templates} />
      </Suspense>
    </div>
  );
};

export default Templates;
