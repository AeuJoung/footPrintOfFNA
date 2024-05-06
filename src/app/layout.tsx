import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";

const pretendard = localFont({
  src:"../../public/font/PretendardVariable.woff2",
  display:"swap",
  weight:"400 700"
});

export const metadata: Metadata = {
  title: "국회의 발자국",
  description: "국회의 발자국 by D.JOUNG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <main>{children}</main>  
      </body>
    </html>
  );
}
