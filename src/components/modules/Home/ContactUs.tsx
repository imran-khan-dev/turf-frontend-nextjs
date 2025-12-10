import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const contactItems = [
  {
    title: 'Email Us',
    description: 'support@turfbooking.com',
    icon: Mail,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Call Us',
    description: '+880 1234 567890',
    icon: Phone,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    title: 'Visit Us',
    description: 'Dhaka, Bangladesh',
    icon: MapPin,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

const ContactCard = ({ item }: { item: typeof contactItems[0] }) => (
  <Card className={`${item.bgColor} hover:shadow-lg transition-shadow duration-300 text-center`}>
    <CardContent className="p-8 flex flex-col items-center">
      <div className={`p-4 rounded-full ${item.iconColor} bg-white shadow-sm mb-4`}>
        <item.icon size={32} />
      </div>
      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
    </CardContent>
  </Card>
);

const ContactUs = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
          <p className="text-muted-foreground mt-4">
            Reach out to us for any questions or support regarding our turf booking platform.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {contactItems.map((item) => (
            <ContactCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
