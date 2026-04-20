'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navigation/navbar'
import { mockListings } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/format-utils'
import { ArrowLeft, Eye, Users, MessageSquare, Bell, FileText, CheckCircle2, Clock, AlertCircle, Upload } from 'lucide-react'
import Link from 'next/link'

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const listing = mockListings.find(l => l.id === params.id)

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Listing Not Found</h1>
          <Link href="/seller/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getDealStageProgress = (stage: typeof listing.dealStage) => {
    const stages = ['submission', 'document-verification', 'investor-matching', 'negotiation', 'due-diligence', 'closing']
    return ((stages.indexOf(stage) + 1) / stages.length) * 100
  }

  const progress = getDealStageProgress(listing.dealStage)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant={listing.status === 'active' ? 'green' : 'yellow'}>
                {listing.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Listing Info */}
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              <p className="text-muted-foreground mb-4">{listing.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">{listing.location}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Site Age</div>
                  <div className="font-semibold">{listing.siteAge}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Profit Margin</div>
                  <div className="font-semibold">{listing.profitMargin}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Revenue Multiple</div>
                  <div className="font-semibold">{listing.revenueMultiple}x</div>
                </div>
              </div>
            </Card>

            {/* Deal Progress */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Deal Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium capitalize">{listing.dealStage.replace('-', ' ')}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stage Timeline */}
                <div className="space-y-3 pt-4">
                  {[
                    { stage: 'submission', label: 'Submission', done: true },
                    { stage: 'document-verification', label: 'Document Verification', done: listing.dealStage !== 'submission' },
                    { stage: 'investor-matching', label: 'Investor Matching', done: ['negotiation', 'due-diligence', 'closing'].includes(listing.dealStage) },
                    { stage: 'negotiation', label: 'Negotiation', done: ['due-diligence', 'closing'].includes(listing.dealStage) },
                    { stage: 'due-diligence', label: 'Due Diligence', done: listing.dealStage === 'closing' },
                    { stage: 'closing', label: 'Closing', done: false }
                  ].map((stage) => (
                    <div key={stage.stage} className="flex items-center gap-3">
                      {stage.done ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : listing.dealStage === stage.stage ? (
                        <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted" />
                      )}
                      <span className={stage.done ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                        {stage.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Notifications */}
            {listing.notifications && listing.notifications.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </h2>
                <div className="space-y-3">
                  {listing.notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border ${notification.read ? 'bg-background' : 'bg-blue-50 border-blue-200'}`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.type === 'document-request' && <FileText className="w-5 h-5 text-orange-600 mt-0.5" />}
                        {notification.type === 'investor-interest' && <Users className="w-5 h-5 text-blue-600 mt-0.5" />}
                        {notification.type === 'document-approved' && <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />}
                        {notification.type === 'offer-received' && <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString()}
                          </p>
                          {notification.actionRequired && (
                            <Button size="sm" className="mt-2 gap-2">
                              <Upload className="w-4 h-4" />
                              Upload Document
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Investor Feedback */}
            {listing.feedback && listing.feedback.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Investor Feedback</h2>
                <div className="space-y-4">
                  {listing.feedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold">{feedback.investorName}</div>
                          <div className="text-xs text-muted-foreground">
                            {feedback.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant={feedback.interested ? 'green' : 'grey'}>
                          {feedback.interested ? 'Interested' : 'Passed'}
                        </Badge>
                      </div>
                      {feedback.reason && (
                        <p className="text-sm text-muted-foreground mt-2">{feedback.reason}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        Stage: <span className="font-medium capitalize">{feedback.stage.replace('-', ' ')}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Listing Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-semibold">{listing.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Watchers</span>
                  </div>
                  <span className="font-semibold">{listing.watchers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Comments</span>
                  </div>
                  <span className="font-semibold">{listing.comments}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Matched Investors</span>
                  </div>
                  <span className="font-bold text-blue-600">{listing.matchedInvestors}</span>
                </div>
              </div>
            </Card>

            {/* Financials */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Financials</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Asking Price</div>
                  <div className="text-xl font-bold">{formatCurrency(listing.askingPrice)}</div>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-sm text-muted-foreground">Monthly Profit</div>
                  <div className="font-semibold">{formatCurrency(listing.monthlyProfit)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Annual Revenue</div>
                  <div className="font-semibold">{formatCurrency(listing.revenue)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Profit Multiple</div>
                  <div className="font-semibold">{listing.profitMultiple}x</div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  Edit Listing
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Download Data Room
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
