"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./fonts.css";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import Providers from "./providers";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSwagger = pathname?.startsWith("/swagger");

  return (
    <html lang="ko" className="h-full">
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="m-0 h-full bg-gray-500 p-0">
        <SessionProvider>
          <Providers>
            {isSwagger ? children : <LayoutWrapper>{children}</LayoutWrapper>}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
