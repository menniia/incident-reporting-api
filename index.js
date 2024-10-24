import express from "express"
import "dotenv/config";
import incidentRoute from "./routes/incidentRoute.js";


const app = express()

app.use(express.json())

// use route
app.use("/api/v1", incidentRoute)

const port = process.env.PORT || 2024;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})