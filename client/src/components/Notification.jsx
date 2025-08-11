import { useState, useEffect } from 'react'

export default function Notification({ message, type = 'success', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            if (onClose) onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    if (!isVisible) return null

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'
    const icon = type === 'success' ? '✓' : '✕'

    return (
        <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}>
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{message}</span>
            <button 
                onClick={() => {
                    setIsVisible(false)
                    if (onClose) onClose()
                }}
                className="ml-2 text-white hover:text-gray-200 text-xl"
            >
                ×
            </button>
        </div>
    )
}
