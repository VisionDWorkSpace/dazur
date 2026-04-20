'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navigation/navbar'
import { mockListings, type Listing } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/format-utils'
import { LayoutGrid, List, Eye, Users, FileText, TrendingUp, AlertCircle, CheckCircle2, Clock, Plus } from 'lucide-react'
import Link from 'next/link'

export default function SellerDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const sellerListings = mockListings.filter((_, idx) => idx < 2) // Mock: first 2 listings are seller's

  const getDealStageInfo = (stage: Listing['dealStage']) => {
    const stages = {
      'submission': { label: 'Submission', icon: FileText, color: 'text-grey-600' },
      'document-verification': { label: 'Document Verification', icon: Clock, color: 'text-yellow-600' },
      'investor-matching': { label: 'Investor Matching', icon: Users, color: 'text-blue-600' },
      'negotiation': { label: 'Negotiation', icon: TrendingUp, color: 'text-purple-600' },
      'due-diligence': { label: 'Due Diligence', icon: FileText, color: 'text-orange-600' },
      'closing': { label: 'Closing', icon: CheckCircle2, color: 'text-green-600' }
    }
    return stages[stage] || stages.submission
  }

  const getStatusBadge = (status: Listing['status']) => {
    const variants = {
      'pending': 'grey',
      'active': 'green',
      'under-review': 'yellow',
      'sold': 'blue'
    }
    return variants[status] || 'grey'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Listings</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your submitted opportunities and track deal progress
              </p>
            </div>
            <Link href="/">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Submit New Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Listings</div>
            <div className="text-2xl font-bold">{sellerListings.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {sellerListings.filter(l => l.status === 'active').length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Views</div>
            <div className="text-2xl font-bold">
              {sellerListings.reduce((sum, l) => sum + l.views, 0)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Matched Investors</div>
            <div className="text-2xl font-bold text-blue-600">
              {sellerListings.reduce((sum, l) => sum + l.matchedInvestors, 0)}
            </div>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Opportunities</h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
          </div>
        </div>

        {/* Listings */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
          {sellerListings.map((listing) => {
            const stageInfo = getDealStageInfo(listing.dealStage)
            const StageIcon = stageInfo.icon
            const unreadNotifications = listing.notifications?.filter(n => !n.read).length || 0

            return (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link href={`/seller/listing/${listing.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                          {listing.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {listing.location} • {listing.siteAge}
                      </p>
                    </div>
                    <Badge variant={getStatusBadge(listing.status)}>
                      {listing.status}
                    </Badge>
                  </div>

                  {/* Deal Stage */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-muted/30">
                    <StageIcon className={`w-5 h-5 ${stageInfo.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{stageInfo.label}</div>
                      <div className="text-xs text-muted-foreground">Current deal stage</div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Asking Price</div>
                      <div className="font-semibold text-sm">{formatCurrency(listing.askingPrice)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Monthly Profit</div>
                      <div className="font-semibold text-sm">{formatCurrency(listing.monthlyProfit)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Views</div>
                      <div className="font-semibold text-sm flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {listing.views}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Matched Investors</div>
                      <div className="font-semibold text-sm flex items-center gap-1 text-blue-600">
                        <Users className="w-3 h-3" />
                        {listing.matchedInvestors}
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  {unreadNotifications > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm mb-3">
                      <AlertCircle className="w-4 h-4" />
                      <span>{unreadNotifications} new notification{unreadNotifications > 1 ? 's' : ''}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <Link href={`/seller/listing/${listing.id}`}>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
