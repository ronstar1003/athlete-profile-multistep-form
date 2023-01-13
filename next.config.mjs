// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};
export default config;
