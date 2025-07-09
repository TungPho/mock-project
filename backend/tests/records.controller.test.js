const request = require("supertest");
const Database = require("../src/dbs/db.instance");
const app = require("../src/app");
const sequelize = Database.getInstance();
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("RecordController", () => {
  describe("POST /api/v1/records", () => {
    it("Should create a record successfully", async () => {
      const res = await request(app)
        .post("/api/v1/records")
        .send({
          name: "Trần Văn B",
          temperature: 38.2,
          contact_with_covid: true,
          symptoms: [
            { symptom_name: "Cough" },
            { symptom_name: "Fever" },
            { symptom_name: "Khó thở" },
          ],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Created new record success");
      expect(res.body.record).toHaveProperty("id");
      expect(Array.isArray(res.body.record.Symptoms)).toBe(true);
    });
  });

  describe("GET /api/v1/records", () => {
    it("Should return all records", async () => {
      const res = await request(app).get("/api/v1/records");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Get all records success");
      expect(Array.isArray(res.body.records)).toBe(true);
      expect(res.body.records.length).toBeGreaterThan(0);
    });
  });

  describe("Validation for POST /api/v1/records", () => {
    it("Should return 400 if name is missing", async () => {
      const res = await request(app)
        .post("/api/v1/records")
        .send({
          temperature: 37,
          contact_with_covid: false,
          symptoms: [{ symptom_name: "Ho" }],
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Name is required and must be a string"
      );
    });

    it("Should return 400 if name is not a string", async () => {
      const res = await request(app)
        .post("/api/v1/records")
        .send({
          name: 1234,
          temperature: 37,
          contact_with_covid: true,
          symptoms: [{ symptom_name: "Ho" }],
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Name is required and must be a string"
      );
    });

    it("Should return 400 if contact_with_covid is not boolean", async () => {
      const res = await request(app)
        .post("/api/v1/records")
        .send({
          name: "Nguyễn Văn A",
          temperature: 37,
          contact_with_covid: "yes",
          symptoms: [{ symptom_name: "Ho" }],
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "contact_with_covid must be a boolean"
      );
    });
  });
});
