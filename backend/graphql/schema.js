import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    profiles: ProfileList!
    profile(id: ID!): ProfileOutput!
    client(client: ClientInput): ClientOutput!
  }
  type Mutation {
    addClient(client: ClientInput): ClientOutput!
  }
  type ProfileList {
    data: [Profile]!
    count: Int!
    message: String
  }
  type Profile {
    id: ID!
    name: String!
    picture: String!
    role: String!
    bio: String!
    location: String!
    projects: [Project]!
  }

  type Project {
    id: ID!
    projectName: String!
    youtube: String!
    github: String!
    description: String!
    technologies: [String]!
  }

  type Client {
    id: ID!
    email: String!
    password: String!
  }
  type ProfileOutput {
    profile: Profile
    message: String
  }
  type ClientOutput {
    client: Client
    message: String
  }
  input ClientInput {
    email: String!
    password: String!
  }
`;
export default typeDefs;
