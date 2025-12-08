import TurfHomepage from "@/components/modules/TurfProfilePublicPage/TurfProfilePublicPage";
import serverFetch from "@/lib/server-fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { turfProfileSlug: string };
}

// Fallback dummy profile if needed
const dummyProfile = {
  name: "Dhanmondi Turf",
  heroImage: "/hero-turf.jpg",
  aboutTitle: "About Our Turf",
  turfProfileSlug: "dhanmondi-turf",
  aboutDesc:
    "We provide high-quality turf fields for football, cricket, and other sports. Comfortable seating and professional management ensure the best experience.",
  aboutImg: "/about-turf.jpg",
  turfFields: [
    { name: "Main Field", pricePerSlot: 2000, available: true },
    { name: "Secondary Field", pricePerSlot: 1500, available: false },
    { name: "Practice Field", pricePerSlot: 1000, available: true },
  ],
  address: "Jhighatola, Dhanmondi, Dhaka",
  googleMapLink: "https://goo.gl/maps/xyz123",
};

export default async function Page({ params }: PageProps) {
  const { turfProfileSlug } = await params;

  let profileData: typeof dummyProfile | null = null;

  console.log("turfProfileSlug", turfProfileSlug);

  try {
    const res = await serverFetch.get(
      `turf-profile/get-turf-profile/${turfProfileSlug}`
    );

    console.log("res", res);

    if (res.ok) {
      const json = await res.json();
      profileData = json.data; // <-- extract the actual profile object
    }
  } catch (err) {
    console.error("Error fetching turf profile:", err);
  }

  console.log("pD", profileData);

  // If profile not found, show friendly 404-like message
  if (!profileData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Turf Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We could not find the turf profile you were looking for.
        </p>
        <Link href="/">
          <Button className="bg-[#1A80E3] hover:bg-blue-700 text-white">
            Go Back Home
          </Button>
        </Link>
      </div>
    );
  }

  return <TurfHomepage profile={profileData} />;
}
