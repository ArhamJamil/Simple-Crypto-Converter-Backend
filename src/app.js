import express from "express"
import Cors from 'cors'
import cookieParser  from "cookie-parser"
import {CoinRouter} from "./routes/Coins.routes.js"

const app = express()

/* CONFIGURATION */ 
app.use(Cors({origin: process.env.CORS_ORIGIN}))
app.use(express.json()) // middleware so that server can only accept data in JSON format
app.use(express.urlencoded({extended: true})) // middleware so that data from url can be read in server correctly
app.use(express.static("public"))
app.use(cookieParser())


/* ROUTES */ 
app.use("/api/v_1", CoinRouter)

export {app}