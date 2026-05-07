'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: number; message: string; type: ToastType }

const ToastContext = createContext<{
  showToast: (message: string, type?: ToastType) => void
}>({ showToast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full sm:w-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 50 }}
              className={`
                flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border text-sm font-bold
                ${toast.type === 'success' ? 'bg-[#1B8C5A] border-white/10 text-white' :
                  toast.type === 'error' ? 'bg-[#E11D48] border-white/10 text-white' : 
                  'bg-[#111111] border-white/10 text-white'}
              `}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 flex-shrink-0" />}
              
              <span className="flex-1">{toast.message}</span>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
