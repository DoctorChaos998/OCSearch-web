import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";
import StoreProvider from "@/store/StoreProvider";
import Auth from "@/components/AuthModule/Auth/Auth";
import Notification from "@/components/Notification/Notification";

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
                <Notification></Notification>
                {children}
            </Auth>
        </StoreProvider>
      </body>
    </html>
  )
}
