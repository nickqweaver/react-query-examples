import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} text-[#000000] dark:text-[#FFFFFF]`}>
        <div className="flex">
          <Link
            className="text-blue-500 font-bold cursor-pointer pt-2 pl-2"
            href="/completed"
          >
            Home
          </Link>
        </div>
        <Providers>
          <main className="flex w-screen h-screen bg-white justify-center items-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
