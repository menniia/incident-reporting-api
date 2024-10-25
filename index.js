import express from "express"
import "dotenv/config";
import incidentRoute from "./routes/incidentRoute.js";
import sequelize from "./config/db.js";


const app = express()


// middleware to parse JSON requests
app.use(express.json())

// Database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connected...")
    })
    .catch(err => {
        console.log("Error connecting to database...", err)
    })

// sequelize.authenticate()
//     .then(() => {
//         console.log("Database connected...");
//         // Start the server only after the connection is successful
//         const port = process.env.PORT || 2024;
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch(err => {
//         console.error("Error connecting to database...", err);
//         // Optionally, you could exit the process if the connection fails
//         process.exit(1);
//     });

// use route
app.use("/api/v1", incidentRoute)

const port = process.env.PORT || 2024;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// export app for testing
export default app