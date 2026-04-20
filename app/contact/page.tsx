"use client"

import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"
import { useEffect } from "react"

export default function ContactPage() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://api.klick-agency.com/js/form_embed.js"
    script.type = "text/javascript"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <SharedHeader currentPage="other" />

      <main className="pt-32 pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
              Get in <span className="font-bold">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Let's discuss how we can help optimize your company's value and accelerate growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h2 className="text-2xl font-light text-white mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Email</p>
                      <a
                        href="mailto:info@dazurcapital.com"
                        className="text-white hover:text-white/80 transition-colors"
                      >
                        info@dazurcapital.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Phone</p>
                      <a href="tel:+351910800680" className="text-white hover:text-white/80 transition-colors">
                        +351 910 800 680
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Location</p>
                      <p className="text-white">Lisbon, Portugal</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-xl font-light text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-white/70">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center">
              <Calendar className="w-16 h-16 text-white mb-6" />
              <h2 className="text-3xl font-light text-white mb-4">Schedule a Meeting</h2>
              <p className="text-white/70 mb-8 max-w-md">
                Book a time that works for you and let's discuss how we can help optimize your business value.
              </p>
              <div className="w-full">
                <iframe
                  src="https://api.klick-agency.com/widget/booking/DLudCdvC7F0kvICvxHKf"
                  style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
                  scrolling="no"
                  id="DLudCdvC7F0kvICvxHKf_1764548383557"
                  title="booking"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
