import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Friend | Dog Breeds",
  description: "Paginated catalog with information about dog breeds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
