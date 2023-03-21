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
    client: async (_, { email, password }) => {
      const client = await Client.find({ email: email });
      if (client.length === 0) {
        throw new Error("Client with that email  doesn't exist");
      }
      // Compare the provided password with the user's hashed password
      if (!bcryprt.compareSync(password, client.password)) {
        // If the passwords don't match, return an error message
        throw new Error("Invalid password");
      }
      return { client, message: "Client was fetched successfully" };
    },
  },
  Mutation: {
    addClient: async (_, { client }) => {
      const userExist = await Client.find({ email: client.email });
      if (userExist) {
        throw new Error("Client with that email  already Exist");
      }
      const passwordHash = await bcryprt.hash(client.password, 12);
      const newClient = { email: client.email, password: passwordHash };
      const addedClient = await Client.create(newClient);
      return {
        client: addedClient,
        message: "Client was added successfully",
      };
    },
  },
};
export default resolvers;
