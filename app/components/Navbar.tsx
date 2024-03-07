"use client";
import { LocateIcon } from "lucide-react";
import Icon from "./Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";

const links = [
  {
    route: "PackageSearch",
    href: "/all-products",
  },
  {
    route: "Search",
    href: "/search",
  },
];

const Navbar = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <nav className="py-4 px-6 shadow-lg flex justify-between items-center w-full">
      <Link href="/">
        <p className="text-base font-bold flex">
          Trackr
          <LocateIcon color="purple" className="ml-2" />
        </p>
      </Link>

      <div className="flex items-center space-x-4 ">
        {links.map((link, index: number) => (
          <Icon
            key={index}
            name={link.route}
            onclick={() => {
              router.push(link.href as string);
            }}
          />
        ))}
        <SignedIn>
          <Button onClick={() => signOut(() => router.push("/"))}>
            Sign out
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
