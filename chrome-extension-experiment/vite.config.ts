import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.json"
import zipPack from "vite-plugin-zip-pack"
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
       server.middlewares.use(app)
    },
})

export default defineConfig(({ mode }) => ({
    plugins: [
        crx({ manifest }), 
        ...(mode === "zip" ? [zipPack({ outFileName: "extension.zip" })] : []),
        dummyApi()
    ],
    build: { emptyOutDir: true },
    server: {
        port: 8080
    }
}))
