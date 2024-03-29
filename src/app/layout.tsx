import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import RecoilRootProvider from "../providers/recoilRootProvider"
import BottomNavbar from "@/components/common/BottomNavbar"
import "@/styles/globals.css"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/styles/theme"
import { AuthBoundary } from "@/components/common/AuthBoundary"

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

export const viewport: Viewport = {
  themeColor: "white",
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
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <RecoilRootProvider>
            <ThemeProvider theme={theme}>
              <AuthBoundary>
                {children} <BottomNavbar />
              </AuthBoundary>
            </ThemeProvider>
          </RecoilRootProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
