"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
        signIn("email", { email, callbackUrl: "/" });
      } else {
        reject();
      }
      setEmail("");
      setPassword("");
      setCreatingUser(false);
    });

    toast.promise(promise, {
      loading: "Loading...!",
      success: "Registration successful!",
      error: "Unable to Signup. Please try again later.",
    });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>

      <form className="block max-w-sm mx-auto " onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={creatingUser}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={creatingUser}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-gray-500 text-center ">
          or Login with Provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex justify-center gap-4"
        >
          <Image src={"/google.png"} alt="GoogleLogo" width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4 ">
          Existing account? &nbsp;
          <Link className="underline font-medium" href={"/login"}>
            Login Here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
