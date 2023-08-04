import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";
import StoreProvider from "@/store/StoreProvider";
import Auth from "@/components/Auth/Auth";

const inter = Poppins({ weight: '400', display: 'swap', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OCSearch',
  description: 'Power',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
            <Auth>
                {children}
            </Auth>
        </StoreProvider>
      </body>
    </html>
  )
}