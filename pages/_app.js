import "@/styles/globals.css";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({
  weight: "400",
  subsets: ["latin", "cyrillic"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={robotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
