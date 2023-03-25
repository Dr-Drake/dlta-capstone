import { expect, assert } from "chai";
import { ApolloServer } from "@apollo/server";
import typeDefs from "../graphql/schema.js";
import { profiles } from "../data/profiles.data.js";
import bcryprt from "bcryptjs";

let clients = [];

const resolvers = {
  Query: {
    profiles: () => {
      const count = profiles.length;

      return {
        data: profiles,
        count,
        message: "profiles fetched successfully",
      };
    },
    profile: (_, { id }) => {
      const profile = profiles.filter((item) => item._id === id)[0];
      return { profile, message: "Profile was fetched successfully" };
    },
    client: (_, { client }) => {
      const clientRetrieved = clients.filter(
        (item) => item.email == client.email
      )[0];
      if (!clientRetrieved) {
        throw new Error("Client with that email  doesn't exist");
      }

      // Compare the provided password with the user's hashed password
      if (!bcryprt.compareSync(client.password, clientRetrieved.password)) {
        // If the passwords don't match, return an error message
        throw new Error("Invalid password");
      }
      return {
        client: clientRetrieved,
        message: "Client was fetched successfully",
      };
    },
  },
  Mutation: {
    addClient: async (_, { client }) => {
      const userExist = clients.filter((item) => item.email == client.email);

      if (userExist.length != 0) {
        throw new Error("Client with that email  already Exist");
      }
      const passwordHash = await bcryprt.hash(client.password, 12);
      const newClient = { email: client.email, password: passwordHash };
      clients.push(newClient);
      return {
        client: newClient,
        message: "Client was added successfully",
      };
    },
  },
};

describe("Test Schema", () => {
  it("it returns  profiles", async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: `
      query getProfiles {
        profiles {
          count
          message
        }
      }
      `,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).to.be.undefined;
    expect(response.body.singleResult.data?.profiles.count).to.equal(3);
  });

  it("it returns a profile", async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: `
      query getProfile{
        profile(id: "6419e4a01504645521cfe757") {
          profile {
            name
          }
          message
        }
      }
      
      `,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).to.be.undefined;
    expect(response.body.singleResult.data?.profile.profile.name).to.equal(
      "Mugisha Samuel"
    );
  });

  it("it creates a client", async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: `
      mutation addClient {
        addClient(client: {email:"mugisha@gmail.com", password:"12345" } ) {
          client {
            email
            password
          }
          message
        }
      }
      
      `,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).to.be.undefined;
    expect(response.body.singleResult.data?.addClient.client.email).to.equal(
      "mugisha@gmail.com"
    );
  });

  it("it retrieves a client", async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: `
    
      query getClient {
        client(client: {email:"mugisha@gmail.com", password:"12345" }) {
          client {
            email
            password
          }
          message
        }
      }
      
      `,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).to.be.undefined;
    expect(response.body.singleResult.data?.client.client.email).to.equal(
      "mugisha@gmail.com"
    );
  });
});
