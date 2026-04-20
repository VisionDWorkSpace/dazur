'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, TrendingUp, MapPin } from 'lucide-react'
import Link from 'next/link'
import type { MockListing } from '@/lib/mock-data'

interface ListingCardProps {
  listing: MockListing
  userRole: 'buyer' | 'seller'
}

export function ListingCard({ listing, userRole }: ListingCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'under-review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image with Confidential Overlay */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
        {listing.imageUrl ? (
          <img src={listing.imageUrl || "/placeholder.svg"} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-serif text-blue-900/20">{listing.title.charAt(0)}</span>
          </div>
        )}
        {userRole === 'buyer' && listing.isConfidential && (
          <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm font-semibold mb-1">Confidential</div>
              <div className="text-xs">Sign NDA to view</div>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.isVerified && (
            <Badge className="bg-white text-blue-600 border-blue-600">
              <span className="mr-1">✓</span> Verified Listing
            </Badge>
          )}
          {listing.isEditorChoice && (
            <Badge className="bg-purple-600 text-white">
              <span className="mr-1">★</span> Editor's Choice
            </Badge>
          )}
        </div>
        {userRole === 'buyer' && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/60 text-white backdrop-blur">
              <Eye className="w-3 h-3 mr-1" />
              {listing.watchers}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Type */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{listing.title}</h3>
            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(listing.status)}`}>
              {listing.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <div className="text-muted-foreground text-xs">Type</div>
            <div className="font-medium">{listing.type}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Industry</div>
            <div className="font-medium">{listing.industry}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Site Age</div>
            <div className="font-medium">{listing.siteAge}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Net Profit</div>
            <div className="font-medium">{formatCurrency(listing.netProfit)}/mo</div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{listing.location}</span>
        </div>

        {/* Multiples */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="font-medium">{listing.profitMultiple}x</span>
            <span className="text-muted-foreground">Profit</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{listing.revenueMultiple}x</span>
            <span className="text-muted-foreground">Revenue</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-1">Asking Price</div>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(listing.askingPrice)}</div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {userRole === 'buyer' ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="w-4 h-4 mr-1" />
                Watch
              </Button>
              <Link href={`/buyer/listing/${listing.id}`} className="flex-1">
                <Button size="sm" className="w-full">View Listing</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/seller/listing/${listing.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-transparent">View Details</Button>
              </Link>
              <Button size="sm" className="flex-1">
                {listing.investorMatches} Matches
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
