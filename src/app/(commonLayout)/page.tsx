import { Hero } from "@/components/modules/Home/Hero";
import Steps from "@/components/modules/Home/Steps";
import Head from "next/head";
import AboutUs from "@/components/modules/Home/AboutUsCard";
import Features from "@/components/modules/Home/Features";
import ContactUs from "@/components/modules/Home/ContactUs";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Steps />
        <ContactUs />
      </main>
    </>
  );
}
