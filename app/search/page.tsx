import HeroCarousel from "../components/HeroCarousel";
import SearchBar from "../components/SearchBar";
import { ArrowRightCircleIcon } from "lucide-react";
import Heading from "../components/reusables/Heading";
import Paragraph from "../components/reusables/Paragraph";
import Navbar from "../components/Navbar";

export default async function Search() {

  return (
    <>
      <Navbar />
      <section className="px-6 md:px-20 py-24 mt-6">
        <div className="flex max-xl:flex-col items-center justify-between gap-16">
          <div className="w-full flex flex-col space-y-8 justify-center">
            <p className="text-base font-bold flex">
              Discover Deals on Your Favorite Amazon Products!
              <ArrowRightCircleIcon color="purple" className="ml-2" />
            </p>

            <Heading className="text-left leading-relaxed">
              Never Miss a Price Drop or Availability Change Again
            </Heading>

            <Paragraph size={"sm"} className=" font-medium">
              Find incredible deals on the products you love and set up
              notifications to be the first to know when prices drop or items
              come back in stock.
            </Paragraph>

            <SearchBar />
          </div>

          <HeroCarousel />
        </div>
      </section>
    </>
  );
}
