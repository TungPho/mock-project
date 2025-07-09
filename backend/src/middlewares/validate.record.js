const validateRecord = (req, res, next) => {
  const { name, temperature, contact_with_covid, symptoms } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "Name is required and must be a string" });
  }
  if (isNaN(temperature) || temperature < 35 || temperature > 42) {
    return res.status(400).json({
      message: "Temperature is required and must be a number between 35 and 42",
    });
  }

  if (typeof contact_with_covid !== "boolean") {
    return res
      .status(400)
      .json({ message: "contact_with_covid must be a boolean" });
  }

  if (!Array.isArray(symptoms)) {
    return res.status(400).json({ message: "Symptoms must be an array" });
  }

  next();
};

module.exports = validateRecord;
