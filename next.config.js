module.exports = {
  reactStrictMode: true,
  images: {
    domains:[`api-redcardvpn.b2gsoft.com`],
    // domains: [ process.env.NODE_ENV === "development" ?  `192.168.5.248` : `api-redcardvpn.b2gsoft.com`],
    // domain: [`192.168.5.248`],
  },
  experimental: { css: true }
}
