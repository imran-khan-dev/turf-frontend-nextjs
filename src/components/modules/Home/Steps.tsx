import { Search, CalendarCheck, CreditCard, ClipboardList } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Search,
    title: 'List Your Turf',
    description: 'Register your turf and create a professional profile quickly.',
  },
  {
    icon: CalendarCheck,
    title: 'Manage Bookings',
    description: 'Track turf availability and schedule bookings easily.',
  },
  {
    icon: CreditCard,
    title: 'Accept Payments',
    description: 'Get paid securely and instantly through multiple payment methods.',
  },
  {
    icon: ClipboardList,
    title: 'View Reports',
    description: 'Analyze your earnings and optimize your turf business efficiently.',
  },
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
  const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-yellow-50'];
  const textColors = ['text-blue-500', 'text-green-500', 'text-purple-500', 'text-yellow-500'];

  return (
    <Card className={`${bgColors[index % bgColors.length]} hover:shadow-lg transition-shadow duration-300`}>
      <CardContent className="p-6 flex items-start space-x-4">
        <div className={`p-3 rounded-full ${textColors[index % textColors.length]} bg-white shadow-sm`}>
          <Icon size={28} />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">{title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Steps = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Simple Steps to Manage Your Turf</h2>
          <p className="text-muted-foreground mt-3">
            Everything you need to manage your turf bookings and grow your business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
