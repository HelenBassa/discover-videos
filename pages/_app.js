import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";

import Loading from "@/components/loading/loading";

import { Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "cyrillic"],
  weight: "700",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPage() {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
    getPage();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <main className={robotoSlab.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  );
}
