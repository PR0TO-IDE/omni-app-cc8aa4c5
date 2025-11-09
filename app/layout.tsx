import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "TrailFinder Mountain",
  description: "Dark-mode mountain hiking trails with elevation insights.",
  themeColor: "#020817",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-[#020817] text-slate-50">
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="mountain-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute -right-32 -top-40 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
            <div className="absolute -left-24 -top-20 h-52 w-52 rounded-full bg-sky-500/5 blur-3xl" />
          </div>
          <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-4 pt-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}