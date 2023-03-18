import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  country: { type: String, required: true },
  year: { type: String, required: true },
  area: { type: String, required: true },
  totalPopulation: { type: String, required: true },
});

export default mongoose.model("Country", countrySchema);
