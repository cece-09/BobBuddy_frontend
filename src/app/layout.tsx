import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

// app metadata
const APP_NAME = "밥버디"
const APP_DEFAULT_TITLE = "밥버디"
const APP_TITLE_TEMPLATE = "%s-app"
const APP_DESCRIPTION = "점심시간에 잠깐 만날 수 있는 매칭 서비스"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startupImage: [],
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/assets/icons/icon-48x48.png' />
        <link rel='apple-touch-icon' href='/assets/icons/icon-192x192.png' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}