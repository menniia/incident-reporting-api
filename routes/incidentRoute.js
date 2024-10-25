import { Router } from "express";
import { listIncidents, reportIncident, searchIncidents } from "../controllers/incidentController.js";

const incidentRoute = Router();

incidentRoute.post("/incidents/report-incident", reportIncident)

incidentRoute.get("/incidents/all-incidents", listIncidents);

incidentRoute.post("/incidents/search-incident", searchIncidents)

export default incidentRoute