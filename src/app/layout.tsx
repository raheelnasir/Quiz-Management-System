import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import RootNavbar from "@/globalcomponents/RootNavbar";
import RootFooter from "@/globalcomponents/RootFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Maker",
  description: "Perform quiz test your knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />

        <AuthProvider>
          <RootNavbar />
          <div className="min-h-screen  ">
            {children}

          </div>
        </AuthProvider>
        <RootFooter />
        <script src="https://cdn.tailwindcss.com"></script>
      </body>
    </html>
  );
}
