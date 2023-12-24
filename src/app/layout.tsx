import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import {Providers} from "@/store/providers";
import Auth from "@/components/User/Auth/Auth";
import Notification from "@/components/Notification/Notification";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OCSearch',
  description: 'Powered by doctor',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
      <Providers>
        <html lang="en">
            <body className={inter.className}>
                <Auth>
                    <Notification/>
                    {children}
                </Auth>
                <div id={"modalsContainer"}></div>
            </body>
        </html>
      </Providers>
  )
}
