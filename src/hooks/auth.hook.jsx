"use client";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function useLoggedIn() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  return {user: session?.user, isPending};
}

export const useGetCurrentUser = () => {
  const {data: session, isPending} = authClient.useSession();
  return {user: session?.user, isPending};
};

export function useNotLoggedIn() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  return {user: session?.user, isPending};
}
