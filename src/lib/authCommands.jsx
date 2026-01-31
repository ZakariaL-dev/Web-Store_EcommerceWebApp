"use server";

// Utils
import { signIn, signOut } from "@/lib/auth";

// Next
import { cookies } from "next/headers";


export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("authjs.session-token");
  cookieStore.delete("__Secure-authjs.session-token");
  cookieStore.delete("authjs.csrf-token");
  cookieStore.delete("authjs.callback-url");

  await signOut({ redirectTo: "/" });
}

export async function loginWithCredentials(email, password) {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
}
