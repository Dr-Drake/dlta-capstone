import Profile from "../models/profile.js";
import Client from "../models/client.js";
import bcryprt from "bcryptjs";
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
      if (client.length === 0) {
        throw new Error("Client with that email  doesn't exist");
      }
      return { client, message: "Client was fetched successfully" };
    },
    clientExists: async (parent, { email }) => {
      // Query the database to check if a client with the provided email exists
      const userByEmail = await Client.find({ email: email });

      if (!userByEmail) {
        // If a client with the provided email doesn't exist, return an error message
        throw new Error("Client not found");
      }

      // Compare the provided password with the user's hashed password
      if (!bcryprt.compareSync(password, user.password)) {
        // If the passwords don't match, return an error message
        throw new Error("Invalid password");
      }

      return userByEmail;
    },
  },
  Mutation: {
    addClient: async (parent, args) => {
      const {
        input: { email, password },
      } = args;
      const passwordHash = await bcryprt.hash(password, 12);
      const clientExists = await context.dataSources.userAPI.clientExists(
        email
      );
      if (clientExists) {
        throw new Error("Client with that email  already Exist");
      }
      const addedClient = await Client.create({ email, passwordHash });
      return {
        client: addedClient,
        message: "Client was added successfully",
      };
    },
  },
};
export default resolvers;
