"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);

    try {

      const signInResponse = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });


      if (signInResponse.error) {
        toast.error("Login failed");
        console.error("Login failed:", response.error);
      } else {
        toast.success("Well Come..!");
        console.log("Login successful:", response);
        setEmail("");
        setPassword("");
        // Add any additional logic or redirect here
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoginProgress(false);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Login</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          disabled={loginProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          disabled={loginProgress}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginProgress}>
        {loginProgress ? "Logging in..." : "Login"}
        </button>
        <div className="my-4 text-gray-500 text-center ">
          or Login with Provider
        </div>
      </form>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex justify-center gap-4"
      >
        <Image src="/google.png" alt="GoogleLogo" width={24} height={24} />
        Login with google
      </button>
    </section>
  );
};

export default LoginPage;
