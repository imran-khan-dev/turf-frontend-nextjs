import Image from "next/image";
import { HeroProps } from "@/types/heroProps";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";

export function Hero({
  badge = {
    text: "Turf Booking SaaS",
  },
  heading = {
    line1: "Manage Your Turf",
    line2: "Bookings Effortlessly",
  },
  description = [
    "A simple and powerful platform for turf owners to manage bookings,",
    "track users, and grow their turf business online.",
  ],
  stats = [
    { value: "100+", label: "Turf Owners" },
    { value: "500+", label: "Registered Users" },
    { value: "50+", label: "Turf Profiles" },
  ],
}: HeroProps) {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/turf-field.jpg"
          alt="Turf Field"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-4 md:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3 py-1">
                <SparkleIcon />
                <span className="text-xs font-medium text-blue-700">
                  {badge.text}
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {heading.line1}
                </h1>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {heading.line2}
                </h1>
              </div>

              {/* Description */}
              <p className="text-white text-base md:text-lg max-w-lg">
                {description.join(" ")}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {/* Get Started Button */}
                <a
                  href="/owner/register"
                  className="bg-[#0C78E1] hover:bg-blue-700 shadow-md text-white rounded-xl px-8 py-3 font-medium transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                >
                  Get Started
                </a>

                {/* Learn More Link */}
                <a
                  href="/about-us"
                  className="self-center text-white text-lg font-medium hover:underline transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-2xl md:text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Optional Illustration or Empty */}
            <div className="hidden lg:flex items-center justify-end">
              <div className="w-full max-w-md">
                {/* Optional: Add illustration or leave empty for minimal hero */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
