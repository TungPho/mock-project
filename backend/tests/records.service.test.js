const { Record, Symptom } = require("../src/models");
const RecordService = require("../src/services/record.service");
jest.mock("../src/models", () => ({
  Record: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
  Symptom: {},
}));

describe("RecordService", () => {
  describe("getAllRecords", () => {
    it("should return all records with symptoms", async () => {
      const mockData = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          Symptoms: [{ symptom_name: "Ho" }],
        },
      ];

      Record.findAll.mockResolvedValue(mockData);

      const result = await RecordService.getAllRecords();

      expect(Record.findAll).toHaveBeenCalledWith({
        include: [{ model: Symptom, as: "Symptoms" }],
        order: [["createdAt", "DESC"]],
      });
      expect(result).toEqual(mockData);
    });
  });

  describe("createRecord", () => {
    it("✅ should create a new record with symptoms", async () => {
      const mockRecord = {
        id: 1,
        name: "Trần Văn B",
        temperature: 38.2,
        contact_with_covid: true,
        Symptoms: [{ symptom_name: "Ho" }, { symptom_name: "Sốt" }],
      };

      Record.create.mockResolvedValue(mockRecord);

      const result = await RecordService.createRecord(
        mockRecord.name,
        mockRecord.temperature,
        mockRecord.contact_with_covid,
        mockRecord.Symptoms
      );

      expect(Record.create).toHaveBeenCalledWith(
        {
          name: "Trần Văn B",
          temperature: 38.2,
          contact_with_covid: true,
          Symptoms: [{ symptom_name: "Ho" }, { symptom_name: "Sốt" }],
        },
        {
          include: [{ model: Symptom, as: "Symptoms" }],
        }
      );

      expect(result).toEqual(mockRecord);
    });
  });
});
