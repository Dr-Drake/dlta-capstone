import Profile from "../models/profile.js";
import Client from "../models/client.js";
import { ObjectId } from "bson";

const resolvers = {
  Query: {
    profiles: async () => {
      const profiles = await Profile.find();
      const count = profiles.length;

      return {
        data: profiles,
        count,
        message: "Profiles fetched successfully",
      };
    },
    profile: async (_, { id }) => {
      const profile = await Profile.findById(id);
      return { profile, message: "Profile was fetched successfully" };
    },
    client: async (_, { email }) => {
      const client = await Client.find({ email: email });
      return { client, message: "Client was fetched successfully" };
    },
  },
  Mutation: {
    addClient: async (_, { client }) => {
      const addedClient = await Client.create(client);
      return {
        client: addedClient,
        message: "Client was added successfully",
      };
    },
  },
};
export default resolvers;
