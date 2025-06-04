// context/loading-context.tsx
'use client'

import { createContext, useContext, useState } from "react"
import "./css/Loading.css"

type LoadingContextType = {
  show: () => void
  hide: () => void
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const show = () => setIsLoading(true)
  const hide = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading }}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-[9999]">
          <div className="wrapperrr">
            <div className="circleee"></div>
            <div className="circleee"></div>
            <div className="circleee"></div>
            <div className="shadowww"></div>
            <div className="shadowww"></div>
            <div className="shadowww"></div>
          </div>
          {/* можно заменить на Spinner или любой кастомный компонент */}
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) throw new Error("useLoading must be used within a LoadingProvider")
  return context
}
