"use client";

// Shadcn Comp
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { PhoneNumberInput } from "../ui/phone-input";

// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// React
import { useState } from "react";

// React Icons
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

// React Phone number
import { isValidPhoneNumber } from "react-phone-number-input";

// Stores
import { useUserStore } from "@/utils/UserStore";

// Next Auth
import { signIn } from "next-auth/react";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const SignUpForm = () => {
  const { addNewUser } = useUserStore();
  const router = useRouter();

  const defaultValues = {
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmePass: "",
  };
  const [SignupForm, setSignupForm] = useState(defaultValues);
  if (SignupForm.phoneNumber && !isValidPhoneNumber(SignupForm.phoneNumber)) {
    HandeResults(false, "Invalid phone number");
  }
  const [passSee, setPassSee] = useState("password");

  const [Loading, setLoading] = useState(false);
  const HandleSubmitUser = async (e) => {
    e.preventDefault();
    if (SignupForm.confirmePass != SignupForm.password) {
      HandeResults("warning", "Your confirmation isnt correct !!!");
      setLoading(false);
      return;
    }
    const { confirmePass, ...UserToSubmit } = SignupForm;
    setLoading(true);
    const { success, message } = await addNewUser(UserToSubmit);

    HandeResults(success, message);

    if (success === true) {
      const res = await signIn("credentials", {
        redirect: false,
        email: UserToSubmit.email,
        password: UserToSubmit.password,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        HandeResults(false, "Failed to log in automatically");
      }
    }
    setLoading(false);
  };
  return (
    <form className="w-full h-full">
      {/* user name */}
      <Input
        value={SignupForm.userName}
        onChange={(e) =>
          setSignupForm({ ...SignupForm, userName: e.target.value })
        }
        type="text"
        placeholder="User Name"
        className="mb-4"
      />
      {/* email */}
      <Input
        value={SignupForm.email}
        onChange={(e) =>
          setSignupForm({ ...SignupForm, email: e.target.value })
        }
        type="email"
        placeholder="Email"
        className="mb-4"
      />
      {/* phone */}
      <PhoneNumberInput
        className="mb-4"
        value={SignupForm.phoneNumber}
        onChange={(value) =>
          setSignupForm({ ...SignupForm, phoneNumber: value })
        }
      />
      {/* password */}
      <div className="relative">
        <Input
          value={SignupForm.password}
          onChange={(e) =>
            setSignupForm({ ...SignupForm, password: e.target.value })
          }
          type={passSee}
          placeholder="Password"
          className="mb-4"
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
      {/* confirme Pasword */}
      <div className="relative">
        <Input
          value={SignupForm.confirmePass}
          onChange={(e) =>
            setSignupForm({ ...SignupForm, confirmePass: e.target.value })
          }
          type={passSee}
          placeholder="Confirme Password"
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
      {/*  */}
      {Loading === false ? (
        <Button
          type="submit"
          className="w-full py-6 text-xl mt-6 mb-2"
          onClick={(e) => HandleSubmitUser(e)}
        >
          Sign Up
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full py-6 text-xl mt-6 mb-2"
          disabled
        >
          <Spinner />
          Processing ...
        </Button>
      )}
      {/*  */}
      <div className="flex items-center justify-center">
        <p>Already have an account?</p>
        <Button type="button" variant={"link"}>
          <Link href={"/signin"}>Sign In</Link>
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
