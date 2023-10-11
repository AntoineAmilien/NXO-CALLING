/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALL_SERVICES_NXO_CALLING: [
      {
        serviceName: "Teams",
        offerName: "TEAMS-CALLING",
      },
      {
        serviceName: "Foo",
        offerName: "FOO-CALLING",
      },
      {
        serviceName: "Bar",
        offerName: "BAR-CALLING",
      },
    ],
  },
};

module.exports = nextConfig;
