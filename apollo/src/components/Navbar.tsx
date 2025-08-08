'use client'
import { createClient } from "@/utils/supabase/client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import {usePathname} from "next/navigation";

const ApolloLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const NavItems = () => {
    const pathname = usePathname();

    const navItems = {
        "unauthenticated": [["Login", "/login"], ["Signup", "/signup"]],
        "authenticated-home": [["Dashboard", "/dashboard"], ["Logout", "/logout"]],
        "authenticated-dashboard": [["Logout", "/logout"]],
        "authorizing": []
    };
    let items = [];
    if (pathname === "/") {
        items = navItems["unauthenticated"];
    }
    else if (pathname === "/login" || pathname === "/signup") {
        items = navItems["authorizing"];
    }
    else {
        items = navItems["unauthenticated"];
    }
    return items.map((item: string[], ind: number) => {
        return (
            <NavbarItem key={ind}>
                <Link color="foreground" href={item[1]}>{item[0]}</Link>
            </NavbarItem>
        );
    });
  };

export default function NavHeader() {
    return (
        <Navbar className="flex justify-between px-8 py-4">
          <NavbarContent className="hidden sm:flex gap-4" justify="center" />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-2">
                <ApolloLogo />
                <p className="font-bold text-inherit">Apollo</p>
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavItems />
          </NavbarContent>
        </Navbar>
      );
}