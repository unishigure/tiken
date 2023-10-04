import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={notoSansJP.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
