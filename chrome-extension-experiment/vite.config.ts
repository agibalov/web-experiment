import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.json"
import express from "express"
import bodyParser from "body-parser"

const dummyApi = () => ({
    name: 'dummy-api',
    configureServer(server) {
        const app = express()
        app.use(bodyParser.json())
        app.get("/hello", (req, res) => {
            res.json({ message: `Hello World! ${new Date().toISOString()}` })
        })
        app.post("/hello", (req, res) => {
            console.log(`POST /hello (body=${JSON.stringify(req.body)})`)
            res.json({ message: `Hello World! ${new Date().toISOString()}` })
        })
        /*
        server.middlewares.use("/hello", (req, res, next) => {
            if (req.method === "GET" || req.method === 'POST') {
                console.log(`${req.method} /hello (body=${req.body})`)
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({ message: `Hello World! ${new Date().toISOString()}` }))
            } else {
                next()
            }
        })*/
       server.middlewares.use(app)
    },
})

export default defineConfig({
    plugins: [crx({ manifest }), dummyApi()],
    build: { emptyOutDir: true },
    server: {
        port: 8080
    }
})
