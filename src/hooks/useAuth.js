import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')
      
      setIsAuthenticated(!!(accessToken || refreshToken))
      setLoading(false)
    }

    checkAuth()
  }, [])

  return { isAuthenticated, loading }
}