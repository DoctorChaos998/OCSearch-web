import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Auth from "@/components/User/Auth/Auth";
import Notification from "@/components/Notification/Notification";
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({subsets: ['latin'], style:'normal' })

export const metadata: Metadata = {
  title: 'OCSearch',
  description: 'Powered by doctor',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
      <StoreProvider>
          <html lang="en">
              <body className={inter.className}>
                  <Auth>
                      <Notification/>
                      {children}
                  </Auth>
                  <div id={"modalsContainer"}></div>
              </body>
          </html>
      </StoreProvider>
  )
}
