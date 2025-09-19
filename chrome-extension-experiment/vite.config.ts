import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.json"

const dummyApi = () => ({
    name: 'dummy-api',
    configureServer(server) {
        server.middlewares.use("/hello", (req, res, next) => {
            if (req.method === "GET" || req.method === 'POST') {
                console.log(`${req.method} /hello (body=${req.body})`)
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({ message: `Hello World! ${new Date().toISOString()}` }))
            } else {
                next()
            }
        })
    },
})

export default defineConfig({
    plugins: [crx({ manifest }), dummyApi()],
    build: { emptyOutDir: true },
    server: {
        port: 8080
    }
})
