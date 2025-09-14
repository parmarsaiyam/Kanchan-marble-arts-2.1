import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-foreground text-background mt-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-accent">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-accent" />
                <a href="tel:+919819460441" className="text-xs hover:text-accent transition-colors">
                  +91 9819460441
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3 text-accent" />
                <a href="https://wa.me/919819460441" className="text-xs hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-accent" />
                <a href="mailto:info@kanchanmarblearts.com" className="text-xs hover:text-accent transition-colors">
                  info@kanchanmarblearts.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-3 w-3 text-accent mt-1" />
                <p className="text-xs">
                Kanchan marble arts, Ashok Nagar,<br />
                Near Akurli Metro Station<br />
                 Kandivali east, Mumbai - 400101<br />
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-accent">Business Hours</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-accent" />
                <div className="text-xs">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-accent">Quick Links</h3>
            <div className="space-y-1">
              <Link href="/privacy" className="block text-xs hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-xs hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="block text-xs hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-xs hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Map Embed */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-accent">Find Us</h3>
            <div className="w-full h-24 bg-muted/20 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9669769932425!2d72.85760827466812!3d19.196644648175074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b718f4306427%3A0xddb9c4ca3b53e836!2sKanchan%20Marble%20Arts.!5e0!3m2!1sen!2sin!4v1756016808996!5m2!1sen!2sin"
                width="100%"
                height="120%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Kanchan Marble Arts Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted/20 mt-6 pt-4">
          <div className="text-center">
            <p className="text-xs opacity-90">
              © {currentYear} Kanchan Marble Arts. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}