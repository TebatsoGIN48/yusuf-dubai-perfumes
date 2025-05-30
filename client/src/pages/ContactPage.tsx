import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'; // Added MessageCircle for WhatsApp

const ContactPage: React.FC = () => {
  const whatsappNumber = '+27713003566';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair font-bold text-center mb-12 text-foreground">Contact Us</h1>
      
      <div className="max-w-3xl mx-auto bg-card p-8 md:p-10 rounded-lg shadow-xl gold-border">
        <p className="text-lg text-center text-muted-foreground mb-8">
          We'd love to hear from you! Whether you have a question about our fragrances, an order, or just want to say hello, feel free to reach out through any of the channels below.
        </p>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">WhatsApp</h2>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-primary hover:underline"
              >
                {whatsappNumber} (Tap to chat)
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Phone</h2>
              <p className="text-lg text-muted-foreground">{whatsappNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Email</h2>
              <a href="mailto:contact@yusufdubaiperfumes.com" className="text-lg text-primary hover:underline">
                contact@yusufdubaiperfumes.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <MapPin className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Visit Us (By Appointment)</h2>
              <p className="text-lg text-muted-foreground">Johannesburg, South Africa</p>
              <p className="text-sm text-muted-foreground">Please contact us to schedule an appointment.</p>
            </div>
          </div>
        </div>

        {/* Placeholder for a future contact form */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Alternatively, you can fill out our contact form (coming soon!).</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
