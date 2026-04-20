'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockListings } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/format-utils'
import { LayoutGrid, List, Search, Filter, Eye, TrendingUp, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'

export default function BuyerDashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()

  // Get only active listings for buyers
  const activeListings = mockListings.filter(l => l.status === 'active')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Investment Opportunities</h1>
              <p className="text-sm text-muted-foreground mt-1">
                1-25 of {activeListings.length} results
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter By
              </Button>
              <Button className="gap-2">
                Create Alert
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Suspense fallback={<Loading />}>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {activeListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                      {listing.confidential && (
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-400/90">
                          <div className="text-center text-white p-4">
                            <div className="font-bold text-lg mb-1">Confidential</div>
                            <div className="text-sm">Sign NDA to view</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <Link href={`/buyer/listing/${listing.id}`}>
                            <h3 className="text-lg font-semibold hover:text-primary transition-colors mb-1">
                              {listing.title}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {listing.verified && (
                              <Badge variant="blue" className="text-xs">
                                Verified Listing
                              </Badge>
                            )}
                            {listing.editorChoice && (
                              <Badge variant="purple" className="text-xs">
                                Editor's Choice
                              </Badge>
                            )}
                            {listing.sponsored && (
                              <Badge variant="orange" className="text-xs">
                                Sponsored
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {listing.description}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-muted-foreground">Asking Price</div>
                          <div className="text-xl font-bold">{formatCurrency(listing.askingPrice)}</div>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Type</div>
                          <div className="text-sm font-medium">{listing.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Industry</div>
                          <div className="text-sm font-medium">{listing.industry}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Monetization</div>
                          <div className="text-sm font-medium">{listing.monetization}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Site Age</div>
                          <div className="text-sm font-medium">{listing.siteAge}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Net Profit</div>
                          <div className="text-sm font-medium">{formatCurrency(listing.monthlyProfit * 12)}/mo</div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Multiple: {listing.profitMultiple.toFixed(1)}x Profit {listing.revenueMultiple.toFixed(1)}x Revenue</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Eye className="w-4 h-4" />
                            Watch
                          </Button>
                          <Link href={`/buyer/listing/${listing.id}`}>
                            <Button size="sm">View Listing</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                    {listing.confidential && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-400/90">
                        <div className="text-center text-white p-4">
                          <div className="font-bold mb-1">Confidential</div>
                          <div className="text-xs">Sign NDA to view</div>
                        </div>
                      </div>
                    )}
                    {listing.editorChoice && (
                      <Badge variant="purple" className="absolute top-2 left-2 text-xs">
                        Editor's Choice
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/buyer/listing/${listing.id}`}>
                      <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                        {listing.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      {listing.verified && (
                        <Badge variant="blue" className="text-xs">Verified</Badge>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {listing.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {listing.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Asking Price</div>
                        <div className="font-bold">{formatCurrency(listing.askingPrice)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Profit Multiple</div>
                        <div className="font-semibold">{listing.profitMultiple.toFixed(1)}x</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Link href={`/buyer/listing/${listing.id}`} className="flex-1">
                        <Button size="sm" className="w-full">View</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
