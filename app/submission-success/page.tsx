'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Clock, FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function SubmissionSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/seller/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Submission Successful!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your opportunity has been submitted for review
            </p>
          </div>

          <div className="w-full grid gap-4 md:grid-cols-2 pt-6">
            <div className="p-4 bg-muted/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Under Review</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Our team is currently reviewing your submission and documents
              </p>
            </div>

            <div className="p-4 bg-muted/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Document Verification</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We're validating all uploaded documents and information
              </p>
            </div>

            <div className="p-4 bg-muted/30 text-left space-y-2 md:col-span-2">
              <div className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Investor Matching</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Once approved, we'll match your opportunity with qualified investors in our network
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-3 w-full">
            <p className="text-sm text-muted-foreground">
              Redirecting to your dashboard in {countdown} seconds...
            </p>
            <Button 
              onClick={() => router.push('/seller/dashboard')} 
              className="w-full"
              size="lg"
            >
              Go to Dashboard Now
            </Button>
          </div>

          <div className="pt-4 border-t w-full">
            <p className="text-sm text-muted-foreground">
              You'll receive an email notification once your listing is approved and live
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
