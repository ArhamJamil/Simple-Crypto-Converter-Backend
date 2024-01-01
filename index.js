import 'dotenv/config'
import { app } from "./src/app.js";

try {
    app.listen(process.env.PORT, ()=>{
        console.log(`App running on port: ${process.env.HOST}${process.env.PORT}`)
    })
} catch (error) {
    console.log("Error while running app : ", error)
}