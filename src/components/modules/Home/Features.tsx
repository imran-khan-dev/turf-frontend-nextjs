import { Users, CalendarCheck, DollarSign, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    name: 'Turf Owner Registration',
    description: 'Register and manage your turf business with ease.',
    icon: Users,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Online Booking Management',
    description: 'Accept and track bookings from users directly online.',
    icon: CalendarCheck,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    name: 'Payments & Earnings',
    description: 'Manage payments, track earnings and financials seamlessly.',
    icon: DollarSign,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    name: 'Turf Profiles',
    description: 'Showcase your turf fields with professional profiles.',
    icon: MapPin,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
];

const Features = () => {
  return (
    <section id='features' className="py-24 mt-16 md:mt-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Everything you need to manage your turf business efficiently.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.name}
              className={cn(
                'text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-[#0C78E1] hover:text-white'
              )}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    `w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${feature.bgColor}`
                  )}
                >
                  <feature.icon
                    className={cn(`text-2xl ${feature.iconColor}`)}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
