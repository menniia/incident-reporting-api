import axios from "axios";
import Incident from "../models/incidentModel.js";
import { Op } from "sequelize";

const apiKey = process.env.OPEN_WEATHER_API_KEY

const reportIncident = async (req, res) => {
    const { client_id, incident_desc, city, country } = req.body;

    try {
        // fetch weather api
        const weatherReport = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)

        // create a new incident, adding weather data to incident table
        const newIncident = await Incident.create({
            client_id,
            incident_desc,
            city,
            country,
            weather_report: (await weatherReport).data
        })
        res.status(200).json({ message: "Incident successfully created", newIncident })
    } catch (error) {
        res.status(500).json({ message: "Failed to create incident", error: error.message })
    }
}

const listIncidents = async (req, res) => {
    const { city, temp_min, temp_max, minHumidity, maxHumidity } = req.query;

    try {
        const find = {};
        if (city) {
            find.city = city
        }

        if (temp_min || temp_max) {
            find.weather_report = {
                ...(find.weather_report || {}),
                ...(temp_min ? { temp_min: { [Op.gte]: temp_min } } : {}),
                ...(temp_max ? { temp_max: { [Op.lte]: temp_max } } : {})
            }
        }

        if (minHumidity || maxHumidity) {
            find.weather_report = {
                ...(find.weather_report || {}),
                ...(minHumidity ? { minHumidity: { [Op.gte]: minHumidity } } : {}),
                ...(maxHumidity ? { maxHumidity: { [Op.lte]: maxHumidity } } : {})
            }
        }

        const incidents = await Incident.findAll({ where: find })
        res.status(200).json(incidents)
    } catch (error) {
        console.error("Error fetching incidents:", error)
        res.status(500).json({ message: "Error fetching incidents", error: error.message })
    }
}

// endpoint to search incidents based on country name
const searchIncidents = async (req, res) => {
    const { country } = req.body;
    try {
        const incidents = await Incident.findAll({ where: { country } })
        res.status(200).json(incidents)
    } catch (error) {
        res.status(500).json({ message: "Error searching incidents", error: error.message })
    }
}


export { reportIncident, listIncidents, searchIncidents }