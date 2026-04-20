'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { LoginDialog } from '@/components/auth/login-dialog'
import { LogOut, User } from 'lucide-react'

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <>
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-lg">Private Banking</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href={user?.role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard'}>
                    <Button variant="ghost" className="gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={logout} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowLoginDialog(true)}>
                    Login
                  </Button>
                  <Link href="/buyer/onboarding">
                    <Button variant="outline">Register as Buyer</Button>
                  </Link>
                  <Link href="/">
                    <Button>Submit Opportunity</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  )
}
