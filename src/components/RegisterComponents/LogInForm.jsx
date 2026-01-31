"use client";

// Shadcn Comp
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

// Next
import Link from "next/link";

// React
import { useState } from "react";

// React Icons
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";

// Utils
import { loginWithGoogle, loginWithCredentials } from "@/lib/authCommands";
import { HandeResults } from "@/lib/HandeResults";


const LogInForm = () => {
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [passSee, setPassSee] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginWithCredentials(LoginForm.email, LoginForm.password);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      HandeResults(false, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleCredentialsLogin}>
        <Input
          value={LoginForm.email}
          onChange={(e) =>
            setLoginForm({ ...LoginForm, email: e.target.value })
          }
          type="email"
          placeholder="Email"
          className={"mb-4"}
          required
        />

        <div className="relative">
          <Input
            value={LoginForm.password}
            onChange={(e) =>
              setLoginForm({ ...LoginForm, password: e.target.value })
            }
            type={passSee}
            placeholder="Password"
            required
          />
          {passSee === "password" ? (
            <LuEye
              className="absolute top-2.5 right-4 text-xl cursor-pointer text-gray-400"
              onClick={() => setPassSee("text")}
            />
          ) : (
            <LuEyeClosed
              className="absolute top-2.5 right-4 text-xl cursor-pointer text-gray-400"
              onClick={() => setPassSee("password")}
            />
          )}
        </div>

        <div className="text-sm text-right">
          <Button variant={"link"} type="button">
            Forgot Password
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-xl my-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div>
        <p className="flex items-center before:content-[''] before:flex-1 before:h-px before:bg-[#d1d5dc] after:content-[''] after:flex-1 after:h-px after:bg-[#d1d5dc] gap-4 mb-4 text-center text-gray-300">
          or Log In with
        </p>
      </div>

      <form action={loginWithGoogle}>
        <Button
          type="submit"
          variant="outline"
          className="flex gap-2 items-center w-full"
          disabled={loading}
        >
          <FaGoogle />
          Google
        </Button>
      </form>

      <div className="flex items-center justify-center">
        <p>Don&apos;t have an account?</p>
        <Button variant={"link"}>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LogInForm;
