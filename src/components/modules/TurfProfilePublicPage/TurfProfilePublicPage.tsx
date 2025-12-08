/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

interface TurfField {
  id: any;
  name: string;
  pricePerSlot: number;
  available: boolean;
  photos?: string[];
}

interface TurfProfile {
  // Basic Info
  id: string;
  name?: string;
  slug?: string;

  // Contact
  phone: string;
  email: string;
  whatsappLink: string;

  // Social Links
  facebookLink: string;
  instagramLink: string;

  // Media Assets
  logo?: string;
  heroImage?: string;

  // About Section
  aboutTitle?: string;
  aboutDesc?: string;
  aboutImg?: string;

  // Turf Details
  openHours?: string;
  turfFields?: TurfField[];

  // Location
  address?: string;
  googleMapLink?: string;
}


interface TurfProfileProps {
  profile: TurfProfile;
}

export default function TurfProfilePublicPage({ profile }: TurfProfileProps) {
  const scrollToTurfFields = () => {
    const section = document.getElementById("turf-fields");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  const router = useRouter();
  const handleBookField = (field: TurfField) => {
    router.push(`/${profile.slug}/book/${field.id}`);
  };

  return (
    <div className="w-full font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white border-b shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold text-[#1A80E3]">
            {profile.name || "Turf App"}
          </span>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#turf-fields" className="hover:text-[#1A80E3]">
              Turf
            </a>
            <a href="#about" className="hover:text-[#1A80E3]">
              About Us
            </a>
            <a href="#contact" className="hover:text-[#1A80E3]">
              Contact
            </a>
          </nav>

          {profile.slug && (
            <Link
              href={`/${profile.slug}/turf-user/login`}
              className="hidden md:block"
            >
              <Button className="bg-[#1A80E3] hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-8">
                  <a href="#turf-fields" className="text-lg font-medium">
                    Turf
                  </a>
                  <a href="#about" className="text-lg font-medium">
                    About Us
                  </a>
                  <a href="#contact" className="text-lg font-medium">
                    Contact
                  </a>
                  {profile.slug && (
                    <Link
                      href={`/${profile.slug}/turf-user/login`}
                      className="mt-4"
                    >
                      <Button className="w-full bg-[#1A80E3] hover:bg-blue-700 text-white">
                        Login
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full h-[500px] bg-gray-100 flex items-center">
        {profile.heroImage && (
          <Image
            src={profile.heroImage}
            alt={profile.name || "Your Turf Name"}
            fill
            className="object-cover"
          />
        )}
        <div className="container mx-auto relative z-10 text-white px-4">
          <h1 className="text-5xl font-bold">
            {profile.name || "Your Turf Name"}
          </h1>
          <p className="text-lg mt-4">
            {profile.address || "Your Turf Address"}
          </p>
          <Button
            className="mt-6 bg-[#1A80E3] hover:bg-blue-700"
            onClick={scrollToTurfFields}
          >
            View Fields
          </Button>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          {profile.aboutImg && (
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={profile.aboutImg}
                alt="About Turf"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-[#1A80E3]">
              {profile.aboutTitle || "About Our Turf"}
            </h2>
            <p className="text-gray-700">
              {profile.aboutDesc || "No description available."}
            </p>
          </div>
        </div>
      </section>

      {/* Turf Fields */}
      <section id="turf-fields" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold text-[#1A80E3] mb-8">
            Our Fields
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(profile.turfFields || []).map((field, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Field Carousel */}
                <div className="w-full h-48 mb-4 relative">
                  {field.photos && field.photos.length > 0 ? (
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={1}
                      loop
                      pagination={{ clickable: true }}
                      navigation
                      className="w-full h-full rounded-lg overflow-hidden"
                    >
                      {field.photos.map((photo, idx) => (
                        <SwiperSlide key={idx}>
                          <Image
                            src={photo}
                            alt={field.name}
                            fill
                            className="object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Field Info */}
                <h3 className="text-xl font-semibold">{field.name}</h3>

                <p className="mt-2 text-gray-600">
                  Price per Slot: {field.pricePerSlot} BDT
                </p>

                <p
                  className={`mt-1 font-medium ${
                    field.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {field.available ? "Available" : "Booked"}
                </p>

                {/* Book Button */}
                <button
                  disabled={!field.available}
                  onClick={() => handleBookField(field)}
                  className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
                    field.available
                      ? "bg-[#1A80E3] hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {field.available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-[#1A80E3] mb-8">
            Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Address */}
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-700">
                {profile.address || "Address not available."}
              </p>
              {profile.googleMapLink && (
                <a
                  href={profile.googleMapLink}
                  target="_blank"
                  className="text-[#1A80E3] hover:underline"
                >
                  View on Google Maps
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col space-y-2">
              {profile.phone && (
                <p>
                  <span className="font-semibold">Phone: </span>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-[#1A80E3] hover:underline"
                  >
                    {profile.phone}
                  </a>
                </p>
              )}
              {profile.email && (
                <p>
                  <span className="font-semibold">Email: </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#1A80E3] hover:underline"
                  >
                    {profile.email}
                  </a>
                </p>
              )}
              <div className="flex space-x-4 mt-2">
                {profile.facebookLink && (
                  <a
                    href={profile.facebookLink}
                    target="_blank"
                    className="text-[#1A80E3] hover:underline"
                  >
                    Facebook
                  </a>
                )}
                {profile.instagramLink && (
                  <a
                    href={profile.instagramLink}
                    target="_blank"
                    className="text-[#1A80E3] hover:underline"
                  >
                    Instagram
                  </a>
                )}
                {profile.whatsappLink && (
                  <a
                    href={profile.whatsappLink}
                    target="_blank"
                    className="text-[#1A80E3] hover:underline"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-700">
          &copy; {new Date().getFullYear()} Turf Booking App. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
}
