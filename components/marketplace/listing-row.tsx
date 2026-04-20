'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, TrendingUp, MapPin } from 'lucide-react'
import Link from 'next/link'
import type { MockListing } from '@/lib/mock-data'

interface ListingRowProps {
  listing: MockListing
  userRole: 'buyer' | 'seller'
}

export function ListingRow({ listing, userRole }: ListingRowProps) {
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
    <div className="bg-white border hover:shadow-md transition-shadow p-4 flex flex-col md:flex-row gap-4">
      {/* Image */}
      <div className="relative w-full md:w-48 h-32 flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100">
        {listing.imageUrl ? (
          <img src={listing.imageUrl || "/placeholder.svg"} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-serif text-blue-900/20">{listing.title.charAt(0)}</span>
          </div>
        )}
        {userRole === 'buyer' && listing.isConfidential && (
          <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white text-xs font-semibold">
              Confidential<br />Sign NDA to view
            </div>
          </div>
        )}
        {listing.isVerified && (
          <Badge className="absolute top-2 left-2 text-xs bg-white text-blue-600 border-blue-600">
            <span className="mr-1">✓</span> Verified
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <Link href={userRole === 'buyer' ? `/buyer/listing/${listing.id}` : `/seller/listing/${listing.id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-blue-600 transition-colors">
                {listing.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">{listing.description}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${getStatusColor(listing.status)}`}>
            {listing.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm mb-3">
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
          <div>
            <div className="text-muted-foreground text-xs">Multiple</div>
            <div className="font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              {listing.profitMultiple}x Profit
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Location</div>
            <div className="font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {listing.location}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Asking Price</div>
            <div className="text-xl font-bold text-foreground">{formatCurrency(listing.askingPrice)}</div>
          </div>
          <div className="flex gap-2">
            {userRole === 'buyer' ? (
              <>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="w-4 h-4 mr-1" />
                  Watch
                </Button>
                <Link href={`/buyer/listing/${listing.id}`}>
                  <Button size="sm">View Listing</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/seller/listing/${listing.id}`}>
                  <Button variant="outline" size="sm" className="bg-transparent">View Details</Button>
                </Link>
                <Button size="sm">
                  {listing.investorMatches} Matches
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
