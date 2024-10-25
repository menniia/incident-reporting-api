import * as chai from "chai"
import chaiHttp from "chai-http";
import sequelize from "../config/db.js";
import app from "../index.js";

chai.use(chaiHttp);

describe("Incident API", () => {
    // reset database before testing
    before(async () => {
        await sequelize.sync({ force: true })
    })

    // close connection after testing
    after(async () => {
        await sequelize.close();
    })

    describe("POST /api/v1/incidents/report-incident", () => {
        it("should create a new incident", async () => {
            const res = await chai.request(app)
                .post("/api/v1/incidents/report-incident")
                .send({
                    client_id: 1,
                    incident_desc: "Example of an incident",
                    city: "London",
                    country: "GB"
                });
            chai.expect(res).to.have.status(201)
            chai.expect(res.body).to.have.property("message", "Incident successfully created")
        })
    });


    describe("GET /api/v1/incidents/all-incidents", () => {
        it("should return all incidents", async () => {
            await chai.request(app)
                .post('/api/v1/incidents/report-incident')
                .send({
                    client_id: 1,
                    incident_desc: "Example of an incident",
                    city: "London",
                    country: "GB"
                });

            const res = await chai.request(app).get("/api/v1/incidents/all-incidents");
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an("array").that.is.not.empty;
        });

        it("should filter incidents by city", async () => {
            const res = await chai.request(app)
                .get("/api/v1/incidents/all-incidents?city=London");

            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an("array").that.is.not.empty;
            chai.expect(res.body[0]).to.have.property("city", "London");
        });
    });

})