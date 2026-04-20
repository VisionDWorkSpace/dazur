'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockListings } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/format-utils'
import { ArrowLeft, Eye, MapPin, Calendar, TrendingUp, Users, BarChart3, FileText, Shield } from 'lucide-react'
import Link from 'next/link'

export default function BuyerListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('description')
  const listing = mockListings.find(l => l.id === params.id)

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Listing Not Found</h1>
          <Link href="/buyer/dashboard">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Button>
            <Button className="gap-2">
              <Eye className="w-4 h-4" />
              Watch
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <Card className="overflow-hidden">
              {/* Header Image */}
              <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                {listing.confidential && (
                  <div className="absolute inset-0 bg-blue-500/90 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <Shield className="w-16 h-16 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Confidential Listing</h3>
                      <p className="mb-4">Sign NDA to view full details and images</p>
                      <Button variant="outline" className="bg-white text-blue-600 hover:bg-white/90">
                        Sign NDA
                      </Button>
                    </div>
                  </div>
                )}
                {listing.sponsored && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="orange">Sponsored</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      {listing.verified && (
                        <Badge variant="blue" className="gap-1">
                          <Shield className="w-3 h-3" />
                          Verified Listing
                        </Badge>
                      )}
                      {listing.editorChoice && (
                        <Badge variant="purple">
                          Editor's Choice
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Business Location</div>
                    <div className="font-semibold flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listing.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Site Age</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {listing.siteAge}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Monthly Profit</div>
                    <div className="font-semibold">{formatCurrency(listing.monthlyProfit)}/mo</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Profit Margin</div>
                    <div className="font-semibold">{listing.profitMargin}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Page Views</div>
                    <div className="font-semibold">{listing.pageViews.toLocaleString()}/mo</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Profit Multiple</div>
                    <div className="font-semibold">{listing.profitMultiple.toFixed(1)}x</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Revenue Multiple</div>
                    <div className="font-semibold">{listing.revenueMultiple.toFixed(1)}x</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Net Profit</div>
                    <div className="font-semibold">{formatCurrency(listing.monthlyProfit * 12)}/mo</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2">About This Business</h3>
                    <p className="text-muted-foreground">{listing.description}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3">Key Highlights</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary mt-2" />
                        <span>Established business with {listing.siteAge} of operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary mt-2" />
                        <span>Strong profit margins of {listing.profitMargin}%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary mt-2" />
                        <span>Consistent monthly traffic of {listing.pageViews.toLocaleString()} page views</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary mt-2" />
                        <span>Lean operations with exceptional cash flow</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="financials" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/30">
                      <div className="text-sm text-muted-foreground mb-1">Annual Revenue</div>
                      <div className="text-2xl font-bold">{formatCurrency(listing.revenue)}</div>
                    </Card>
                    <Card className="p-4 bg-muted/30">
                      <div className="text-sm text-muted-foreground mb-1">Annual Profit</div>
                      <div className="text-2xl font-bold">{formatCurrency(listing.monthlyProfit * 12)}</div>
                    </Card>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Financial Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20">
                        <span className="text-sm">Monthly Profit</span>
                        <span className="font-semibold">{formatCurrency(listing.monthlyProfit)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20">
                        <span className="text-sm">Profit Margin</span>
                        <span className="font-semibold">{listing.profitMargin}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20">
                        <span className="text-sm">Monetization</span>
                        <span className="font-semibold">{listing.monetization}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/30">
                      <div className="text-sm text-muted-foreground mb-1">Monthly Page Views</div>
                      <div className="text-2xl font-bold">{listing.pageViews.toLocaleString()}</div>
                    </Card>
                    <Card className="p-4 bg-muted/30">
                      <div className="text-sm text-muted-foreground mb-1">Site Age</div>
                      <div className="text-2xl font-bold">{listing.siteAge}</div>
                    </Card>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 text-sm text-blue-900">
                    <p>Traffic data is verified and updated monthly. Full analytics access available after NDA signing.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Insights */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">View insights on multiples</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    See how this business compares to similar listings in the marketplace
                  </p>
                  <Link href="#">
                    <Button variant="outline" size="sm" className="bg-white">
                      View Insights
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Asking Price (Classified)</div>
                <div className="text-3xl font-bold mb-1">{formatCurrency(listing.askingPrice)}</div>
                <div className="text-sm text-muted-foreground">
                  EUR {formatCurrency(listing.askingPrice * 0.85).replace('EUR ', '')}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full" size="lg">
                  Contact Seller
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Make Offer
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Eye className="w-4 h-4" />
                  Watch
                </Button>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Views
                  </span>
                  <span className="font-semibold">{listing.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Watchers
                  </span>
                  <span className="font-semibold">{listing.watchers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Comments
                  </span>
                  <span className="font-semibold">{listing.comments}</span>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{listing.type}</Badge>
                <Badge variant="secondary">{listing.industry}</Badge>
                <Badge variant="secondary">{listing.monetization}</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
