'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'seller' | 'buyer' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role: email.includes('buyer') ? 'buyer' : 'seller',
      createdAt: new Date()
    }
    
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      createdAt: new Date()
    }
    
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
