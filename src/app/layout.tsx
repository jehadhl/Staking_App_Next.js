import type { Metadata } from "next";

import '../styles/globals.scss'
import Providers from '@/redux/Provider';
import App from "@/components/App";


export const metadata: Metadata = {
  title: "Zentu Staking Portal",
  description: "Learn how to stake LP tokens with Zentu and earn rewards effortlessly while empowering the blockchain network’s security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <App />{children}
        </Providers>
      </body>
    </html >
  );
}
