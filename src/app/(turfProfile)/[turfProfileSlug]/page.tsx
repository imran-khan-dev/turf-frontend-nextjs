/* eslint-disable @typescript-eslint/no-explicit-any */
import TurfProfilePublicPage from "@/components/modules/TurfProfilePublicPage/TurfProfilePublicPage";
import serverFetch from "@/lib/server-fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { turfProfileSlug: string };
}

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

export default async function Page({ params }: PageProps) {
  const { turfProfileSlug } = await params;

  let profileData: TurfProfile | null = null;
  let turfFields: any | null = null;

  console.log("turfProfileSlug", turfProfileSlug);

  try {
    const res = await serverFetch.get(
      `turf-profile/get-turf-profile/${turfProfileSlug}`
    );

    if (res.ok) {
      const json = await res.json();
      profileData = json.data; // <-- extract the actual profile object
    }
  } catch (err) {
    console.error("Error fetching turf profile:", err);
  }

  const trufProfileId = profileData?.id;

  console.log("tpId", trufProfileId);
  try {
    const res = await serverFetch.get(`turf-field/get-fields/${trufProfileId}`);

    console.log("res", res);
    if (res.ok) {
      const json = await res.json();
      turfFields = json;
    }
  } catch (err) {
    console.error("Error fetching turf fields:", err);
  }

  console.log("pD", turfFields);

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

  return (
    <TurfProfilePublicPage
      profile={{
        ...profileData,
        turfFields: turfFields?.data || [],
      }}
    />
  );
}
