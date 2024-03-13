import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import  AuthProvider  from './context/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "HealthME",
  description: "Health AI. Chatbot and health tracking app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
