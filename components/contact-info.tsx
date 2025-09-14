import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react"

export const whatsappNumber = "+919819460441";
export const phoneNumber = "+919833010441";
export const whatsappMessage = encodeURIComponent(
  "Hello! I'm interested in your marble products and would like to discuss my requirements."
);

interface ContactInfoProps {
  variant?: "all" | "infoOnly" | "mapOnly"
  className?: string
}

export function ContactInfo({ variant = "all", className = "" }: ContactInfoProps) {
  const whatsappNumber = "+919819460441"
  const phoneNumber = "+919833010441"
  const whatsappMessage = encodeURIComponent(
    "Hello! I'm interested in your marble products and would like to discuss my requirements.",
  )

  const InfoCards = (
    <>
      {/* Quick Contact */}
      <Card className="flex-shrink-0">
        <CardContent className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-4">Quick Contact</h3>
          <div className="space-y-4">
            <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700" size="lg">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp Us Now
              </a>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start bg-transparent hover:bg-accent/10 hover:text-accent border-accent/30 hover:border-accent" size="lg">
              <a href={`tel:${phoneNumber}`}>
                <Phone className="w-5 h-5 mr-3" />
                Call Directly
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card className="flex-shrink-0">
        <CardContent className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground text-sm">+919833010441</p>
              </div>
            </div>

            <div className="flex items-start">
              <MessageCircle className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-muted-foreground text-sm">+919819460441</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground text-sm">info@kanchanmarblearts.com</p>
              </div>
            </div>

            <div className="flex items-start">
                  <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                  </a>
              <div>
              <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" target="_blank" rel="noopener noreferrer">
                <p className="font-medium">Address</p>
                <p className="text-muted-foreground text-sm">
                    Ashok Nagar, Near Akurli Metro Station, Kandivali East, Mumbai-400101
                </p>
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-muted-foreground text-sm">
                  Mon - Sun: 9:00 AM to 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )

  const MapCard = (
    <Card className="flex-1 flex flex-col w-full">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 bg-muted rounded-lg overflow-hidden w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9669769932425!2d72.85760827466812!3d19.196644648175074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b718f4306427%3A0xddb9c4ca3b53e836!2sKanchan%20Marble%20Arts.!5e0!3m2!1sen!2sin!4v1756016808996!5m2!1sen!2sin"
            width="100%"
            height="120%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kanchan Marble Arts - Shop Location"
            className="w-full h-full min-h-[510px]"
          ></iframe>
        </div>
        <div className="p-4 text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">Kanchan Marble Arts</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ashok Nagar, Near Akurli Metro Station, Beside Mahanagar CNG Pump, Kandivali east
            </p>
            <Button 
              asChild 
              size="sm" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" />
                Take Me There
              </a>
            </Button>
          </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`space-y-6 h-full flex flex-col ${className}`}>
      {(variant === "all" || variant === "infoOnly") && InfoCards}
      {(variant === "all" || variant === "mapOnly") && MapCard}
    </div>
  )
}
