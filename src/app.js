import express, { json } from "express"

const app = express()

app.use(json())

import jobRouter from "./routes/Job.route.js";

app.use("/api",jobRouter)

export {app};