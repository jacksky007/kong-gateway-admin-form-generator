const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * While run `npm run dev` for development, enviroment variable `KONG_GATEWAY`
 * can be set to the running kong gateway admin url.
 * In my computer, I run docker containers of kong-database and kong-gateway in
 * a Fedora-based vitural machine, and the kong gateway admin url is
 * http://192.168.159.128:8001/.
 * So I run `KONG_GATEWAY=http://192.168.159.128:8001/ npm run dev` for development
 */
const kongGateway = process.env.KONG_GATEWAY || 'http://localhost:8001'

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/schemas', {
      target: kongGateway,
      pathRewrite: {},
    }),
  )
}
