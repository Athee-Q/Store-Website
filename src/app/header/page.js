"use client";

import { CartContext } from "@/context/_app";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import Bars2 from "../../components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href="/profile" className="whitespace-nowrap">
          Hola! &nbsp;{userName}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login">Login</Link>
        <Link
          href="/register"
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}

const Header = () => {
  const { data: userData, status } = useSession();
  const userName = userData?.user?.name || userData?.user?.email.split(" ")[0];
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="py-2 px-4 m-0 rounded-lg sticky top-2 z-20 bg-black/20">
      <div className="md:hidden">
      <div className="  flex items-center justify-between md:hidden">
        <Link
          className="text-primary font-bold tracking-wider text-2xl"
          href="/"
        >
          Foody!
        </Link>
        <div className="flex gap-8 items-center">
          <Link className="relative" href={"/cart"}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-[0.7rem] px-1  rounded-full leading-4">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border-0"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      </div>
      <div className="hidden md:flex items-center justify-between  ">
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <Link
            className="text-primary font-bold tracking-wider text-2xl"
            href="/"
          >
            Foody!
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link className="relative" href={"/cart"}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-[0.7rem] px-1  rounded-full leading-4">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
