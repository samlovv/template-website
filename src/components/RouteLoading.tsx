'use client'

import { usePathname } from 'next/navigation'
import { useLoading } from '@/components/loading-context'
import { useEffect, useRef } from 'react'

export default function RouteLoading() {
  const pathname = usePathname()
  const { show, hide } = useLoading()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current !== pathname) {
      show()
      // Добавим небольшую задержку — имитация загрузки
      const timeout = setTimeout(() => {
        hide()
      }, 500)

      prevPath.current = pathname
      return () => clearTimeout(timeout)
    }
  }, [pathname])

  return null
}
