"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const aboutItems = [
  {
    title: "Empower Your Turf Business",
    description:
      "Register your turf, create a professional profile, and reach more customers with our platform.",
    image: "/turf-field-2.jpg", // use public path
  },
  {
    title: "Seamless Online Booking",
    description:
      "Manage bookings, accept payments, and track your turf’s availability from one dashboard.",
    image: "/turf-field-3.jpg", // use public path
  },
  {
    title: "Grow Your Revenue",
    description:
      "Get insights into your earnings, optimize booking schedules, and increase customer satisfaction.",
    image: "/turf-field-4.jpg", // use public path
  },
];

const AboutUsCard = ({ item }: { item: typeof aboutItems[0] }) => {
  return (
    <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50/50 flex justify-center">
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={200}
          className="border-4 border-white shadow-md"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
        <p className="text-muted-foreground mt-2">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/50 to-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            About Our Turf Booking Platform
          </h2>
          <p className="text-muted-foreground mt-4">
            We provide turf owners with all the tools to manage bookings,
            showcase their turf, and grow their business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {aboutItems.map((item) => (
            <AboutUsCard key={item.title} item={item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => (window.location.href = "/owner/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
