"use client"
import { useEffect, useRef, useState } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"

const industries = [
  {
    id: "real-estate-construction",
    title: "Real Estate & Construction",
    description:
      "Digital-twin technology and data platforms transforming property management into scalable SaaS businesses.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    examples: [
      {
        title: "Matterport (acquired by CoStar, 2024)",
        summary:
          "Matterport's digital-twin 3D property platform and subscription model reclassified it from a hardware/service business to a SaaS-like data platform, increasing investor multiples and leading to CoStar's $1.6bn acquisition.",
        pillars: "Intangible (platform/IP) + Commercial (recurring revenue)",
        outcome: "$1.6bn acquisition by CoStar",
        source: "https://www.reuters.com",
      },
      {
        title: "Procore (IPO, 2021)",
        summary:
          "Procore's construction management SaaS scaled recurring revenue and margins by productising project workflows; the result was an $8–11bn market debut on IPO day.",
        pillars: "Commercial (SaaS recurring revenue) + Intangible (software IP)",
        outcome: "$8-11bn IPO valuation",
        source: "https://www.reuters.com",
      },
      {
        title: "VTS (strategic M&A activity, 2021)",
        summary:
          "VTS consolidated tenant-experience and building-ops platforms via acquisitions (Rise Buildings, Lane) to expand product stickiness and capture more enterprise contracts.",
        pillars: "Commercial + Intangible (product ecosystem)",
        outcome: "Strategic acquisitions strengthening valuation",
        source: "https://www.vts.com",
      },
    ],
  },
  {
    id: "infrastructure-energy",
    title: "Infrastructure & Energy",
    description: "Grid digitalisation and smart infrastructure driving operational efficiency and investor appeal.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    examples: [
      {
        title: "Enel (Gridspertise spin-out)",
        summary:
          "Enel created Gridspertise and committed large capex to grid digitalisation and smart-grid services, improving asset utilisation and attracting infrastructure funds.",
        pillars: "Tangible (asset optimisation) + Technology (digital grid)",
        outcome: "Strategic minority deals with infrastructure funds",
        source: "https://www.enel.com",
      },
      {
        title: "CVC purchase of Gridspertise stake (2022)",
        summary:
          "Private equity interest (CVC buying 50% of Gridspertise) demonstrates that modernised grid businesses with digital capabilities command financial sponsor capital at attractive terms.",
        pillars: "Tangible + Technology",
        outcome: "50% stake acquired by CVC",
        source: "https://www.cvc.com",
      },
      {
        title: "National Grid digital twin programmes",
        summary:
          "Utilities that implemented digital twins and predictive maintenance reduced maintenance costs and produced more stable EBITDA trajectories.",
        pillars: "Tangible (asset reliability) + Technology (analytics)",
        outcome: "Improved EBITDA and investor attractiveness",
        source: "https://www.kpmg.com",
      },
    ],
  },
  {
    id: "industrial-deep-tech",
    title: "Industrial & Deep Tech",
    description: "Automation and robotics IP converting hardware businesses into high-value tech plays.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    examples: [
      {
        title: "ABB acquires ASTI Mobile Robotics (2021)",
        summary:
          "ABB incorporated ASTI's AMR hardware/software to transition from component sales to integrated automation solutions — improving margin profiles.",
        pillars: "Intangible (automation IP) + Commercial (solution selling)",
        outcome: "Strategic acquisition enhancing margins",
        source: "https://www.abb.com",
      },
      {
        title: "Rockwell Automation buys Plex Systems (2021, $2.22bn)",
        summary:
          "Rockwell's acquisition of Plex (cloud manufacturing SaaS) shows how adding cloud-native software to industrial portfolios materially increases multiples.",
        pillars: "Intangible (SaaS) + Commercial (recurring revenue)",
        outcome: "$2.22bn acquisition",
        source: "https://www.reuters.com",
      },
      {
        title: "Zebra/FETCH warehouse automation M&A",
        summary:
          "Companies in robotics/warehouse automation transacted at very high revenue multiples because software and automation IP converted low-margin logistics into high-value tech plays.",
        pillars: "Intangible (robotics IP) + Commercial (new service models)",
        outcome: "Premium revenue multiples",
        source: "https://www.interactanalysis.com",
      },
    ],
  },
  {
    id: "life-sciences-healthcare",
    title: "Life Sciences & Healthcare",
    description: "Clinical data platforms and genomic profiling commanding strategic acquisition premiums.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    examples: [
      {
        title: "Flatiron Health acquired by Roche (2018, ~$1.9bn)",
        summary:
          "Flatiron's clinical-data platform gave Roche scale in real-world oncology evidence; data/IP made Flatiron an attractive strategic acquisition at a premium.",
        pillars: "Intangible (data IP) + Commercial (pharma partnerships)",
        outcome: "$1.9bn acquisition by Roche",
        source: "https://www.reuters.com",
      },
      {
        title: "Foundation Medicine full acquisition by Roche (2018, ~$2.4bn)",
        summary:
          "Foundation Medicine's genomic profiling and commercial contracts directly translated into strategic value for Roche.",
        pillars: "Intangible (technology/IP) + Commercial (product revenue)",
        outcome: "$2.4bn acquisition",
        source: "https://www.reuters.com",
      },
      {
        title: "Illumina / GRAIL transaction (2021–2023)",
        summary:
          "Illumina's acquisition of GRAIL shows that diagnostic/data capabilities can command very large valuations but also regulatory risk.",
        pillars: "Intangible (platform/data) + Finance (deal structuring)",
        outcome: "Multi-billion valuation with regulatory challenges",
        source: "https://investor.illumina.com",
      },
    ],
  },
  {
    id: "tourism-hospitality",
    title: "Tourism & Hospitality",
    description: "Digital platforms and marketplace models achieving high multiples through network effects.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    examples: [
      {
        title: "Airbnb IPO (2020)",
        summary:
          "Airbnb's digital platform and dynamic pricing / network effects converted an asset-light model into very high multiples at IPO.",
        pillars: "Commercial (platform scale) + Intangible (network effects)",
        outcome: "High-multiple IPO",
        source: "https://www.reuters.com",
      },
      {
        title: "Expedia acquisition of HomeAway (2015, ~$3.9bn)",
        summary:
          "Expedia acquired HomeAway to consolidate marketplace scale and recurring bookings, converting fragmented rental supply into enterprise value.",
        pillars: "Commercial + Platform Intangibles",
        outcome: "$3.9bn acquisition",
        source: "https://www.expediagroup.com",
      },
      {
        title: "OYO fundraising and valuation readjustments",
        summary:
          "OYO's scale-up and SaaS-like franchise model attracted large private capital rounds; subsequent valuation resets illustrate operational execution importance.",
        pillars: "Commercial (distribution) + People (operations/franchise)",
        outcome: "Multiple funding rounds with valuation adjustments",
        source: "https://techcrunch.com",
      },
    ],
  },
  {
    id: "commodities-natural-resources",
    title: "Commodities & Natural Resources",
    description: "Data platforms and sustainability services lifting commodity margins and unlocking ESG capital.",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80",
    examples: [
      {
        title: "Indigo Ag large funding rounds (2017–2023)",
        summary:
          "Indigo's data platforms, carbon & regenerative programs and marketplace model attracted institutional capital.",
        pillars: "Intangible (data, MRV) + Commercial (new revenue streams)",
        outcome: "Multiple large funding rounds",
        source: "https://www.indigoag.com",
      },
      {
        title: "Nutrien / Viterra major grain/logistics M&A",
        summary:
          "Large strategic M&A in agri-commodities demonstrate how integrating logistics and asset optimisation increases predictable free cash flow.",
        pillars: "Tangible (logistics assets) + Commercial (market access)",
        outcome: "Industry consolidation at premium valuations",
        source: "https://www.cbinsights.com",
      },
      {
        title: "Commodity companies embracing digital agronomy",
        summary:
          "Corporate strategic investments into agritech platforms show buyers paying premiums for improved margin and risk profiles.",
        pillars: "Technology/Intangible + Tangible (yield uplift)",
        outcome: "Strategic investments and acquisitions",
        source: "https://www.indigoag.com",
      },
    ],
  },
  {
    id: "consulting-business-services",
    title: "Consulting & Business Services",
    description: "Service IP and capability adjacency driving higher group multiples through strategic acquisitions.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    examples: [
      {
        title: "Capgemini acquires Altran (2019/2020, ~€3.6bn)",
        summary:
          "Capgemini bought engineering consultancy Altran to add digital engineering and R&D services, increasing service scope and commanding higher group multiples.",
        pillars: "People (expertise) + Intangible (service IP)",
        outcome: "€3.6bn acquisition",
        source: "https://investors.capgemini.com",
      },
      {
        title: "Accenture acquires Clarity Insights",
        summary:
          "Accenture's purchase of a data & AI consultancy strengthened its applied-intelligence product set, converting boutique consulting fees into scalable services.",
        pillars: "Intangible (data IP) + Commercial (scalable services)",
        outcome: "Strategic capability acquisition",
        source: "https://newsroom.accenture.com",
      },
      {
        title: "Consulting roll-ups and PE platform builds",
        summary:
          "Private equity platform strategies aggregating niche consultancies have shown material multiple arbitrage on exit after process standardisation.",
        pillars: "People + Commercial (recurring retainer models)",
        outcome: "Multiple arbitrage on exit",
        source: "https://www.bundygroup.com",
      },
    ],
  },
  {
    id: "financial-private-capital",
    title: "Financial & Private Capital",
    description: "Platform scalability and compliance driving high-value private placements and public market success.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    examples: [
      {
        title: "Stripe fundraising and valuation growth",
        summary:
          "Stripe's focus on platform scalability, compliance, and product modularity consistently improved unit economics and attracted repeated high-value private placements.",
        pillars: "Intangible (platform) + Finance (capital structure)",
        outcome: "Rising valuations across multiple rounds",
        source: "https://www.reuters.com",
      },
      {
        title: "Adyen IPO and market performance",
        summary:
          "Adyen's scalable payments stack and predictable revenue attracted public markets with strong multiples.",
        pillars: "Commercial + Intangible",
        outcome: "Strong IPO performance",
        source: "https://en.wikipedia.org/wiki/Adyen",
      },
      {
        title: "Revolut large private raises",
        summary:
          "Neobanks that tightened governance, compliance and product monetisation raised substantial institutional capital at premium valuations.",
        pillars: "Finance + People (governance)",
        outcome: "Premium institutional funding",
        source: "https://en.wikipedia.org/wiki/Revolut",
      },
    ],
  },
  {
    id: "transport-distribution",
    title: "Transport & Distribution",
    description: "Tech-enabled logistics platforms and supply-chain visibility attracting growth capital.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    examples: [
      {
        title: "Flexport large funding (2022, ~$935m round)",
        summary:
          "Flexport scaled a tech-enabled freight platform offering visibility and inventory finance — investors rewarded platformised logistics with very large late-stage checks.",
        pillars: "Technology/Intangible + Commercial (visibility services)",
        outcome: "$935m round at ~$8bn valuation",
        source: "https://www.flexport.com",
      },
      {
        title: "Overhaul supply-chain visibility",
        summary:
          "Supply-chain visibility providers that reduce loss/theft and improve SLAs attract strategic and growth capital.",
        pillars: "Intangible (platform) + Commercial (B2B contracts)",
        outcome: "~$100m+ growth funding",
        source: "https://www.barrons.com",
      },
      {
        title: "Optimal Dynamics AI logistics",
        summary:
          "AI optimisation companies for fleet and route planning raised growth capital after demonstrating measurable cost savings.",
        pillars: "Technology + Commercial (cost reduction → margin uplift)",
        outcome: "Series C growth funding",
        source: "https://investors.costargroup.com",
      },
    ],
  },
]

export default function IndustriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <SharedHeader currentPage="other" />

      {/* Hero */}
      <section className="relative min-h-[70vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-black">
          <video autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover opacity-70">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video%20%281%29-VzqE0aVb2b0g18Zqn59M3qXRjJPrp9.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
              Market <span className="font-bold">Insights</span>
            </h1>
            <p className="mb-12 text-lg md:text-xl font-light text-white/80 leading-relaxed">
              Real-world examples of how operational optimization translates into capital market value
            </p>
            <a href="/for-businesses#calculator">
              <button className="rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105">
                Assess Your Company
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Industries */}
      <div className="px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-xl font-light text-foreground/70 max-w-3xl mb-16">
            Each case demonstrates measurable outcomes: successful exits, growth raises, or strategic acquisitions.
          </p>

          {/* Industries */}
          <div className="space-y-20">
            {industries.map((industry) => (
              <IndustrySection key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}

function IndustrySection({ industry }: { industry: (typeof industries)[0] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      id={industry.id}
      className="scroll-mt-32 relative rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        {/* Industry Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{industry.title}</h2>
          <p className="text-lg font-light text-white/90 max-w-3xl">{industry.description}</p>
        </div>

        {/* Examples Slider */}
        <div className="relative">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {industry.examples.map((example, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[90vw] sm:w-[350px] md:w-[400px] snap-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/40 hover:bg-white/20 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-white mb-3">{example.title}</h3>
                <p className="text-sm font-light text-white/90 mb-4 leading-relaxed">{example.summary}</p>
                <div className="space-y-2 text-xs font-light text-white/80 mb-4">
                  <div>
                    <span className="font-bold text-white">Pillars optimised:</span> {example.pillars}
                  </div>
                  <div>
                    <span className="font-bold text-white">Capital outcome:</span> {example.outcome}
                  </div>
                </div>
                <a
                  href={example.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-light text-white hover:underline cursor-pointer"
                >
                  Source
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* What it means */}
        <div className="mt-6 p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
          <p className="text-sm font-bold text-white mb-2">What it means for your company:</p>
          <p className="text-sm font-light text-white/90">
            These examples show how strategic optimisation of specific pillars creates measurable value that investors
            recognize. We help you identify and execute similar opportunities in your business.
          </p>
        </div>
      </div>
    </div>
  )
}
