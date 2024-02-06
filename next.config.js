/** @type {import('next').NextConfig} */

/**
 * To see more configuration options,
 * visit https://www.npmjs.com/package/next-pwa or
 * https://ducanh-next-pwa.vercel.app/docs/next-pwa
 */
const dev = process.env.NODE_ENV === "development"
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: dev,
  register: true,
  skipWaiting: true,
  sw: "service-worker.js",

  // runtimeCaching
  // to customize runtime caching array,
  // see https://github.com/DuCanhGH/next-pwa/blob/master/packages/next-pwa/src/cache.ts

  // extendDefaultRuntimeCaching: true,
  // workboxOptions: {
  //     runtimeCaching: [
  //         // cache options
  //     ]
  // }
})

const nextConfig = withPWA({
  // next.js config
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
})

module.exports = nextConfig
