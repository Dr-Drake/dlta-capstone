import Country from "../models/country.js";
import { ObjectId } from "bson";

const resolvers = {
  Query: {
    countries: async () => {
      const countries = await Country.find();
      const count = countries.length;

      return {
        data: countries,
        count,
        message: "Countries fetched successfully",
      };
    },
    country: async (_, { id }) => {
      const country = await Country.findById(id);
      return { country, message: "Country was fetched successfully" };
    },
  },
  Mutation: {
    addCountry: async (_, { country }) => {
      const addedCountry = await Country.create(country);
      return {
        country: addedCountry,
        message: "Country was added successfully",
      };
    },
    updateCountry: async (_, { country }) => {
      const countryId = country.id;
      delete country.id;
      const updatedCountry = await Country.findByIdAndUpdate(
        { _id: ObjectId(countryId) },
        country
      );
      return {
        country: updatedCountry,
        message: "Country was updated successfully",
      };
    },
    deleteCountry: async (_, { id }) => {
      const country = await Country.findByIdAndDelete(id);
      return { country, message: "Country was  deleted successfully" };
    },
  },
};
export default resolvers;
