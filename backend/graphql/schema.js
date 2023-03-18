import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    countries: CountryList!
    country(id: ID!): CountryOutput!
  }
  type Mutation {
    addCountry(country: CountryInput): CountryOutput!
    updateCountry(country: CountryUpdate): CountryOutput!
    deleteCountry(id: ID!): CountryOutput!
  }
  type CountryList {
    data: [Country]!
    count: Int!
    message: String
  }
  type Country {
    id: ID!
    area: Int!
    country: String!
    totalPopulation: Int!
    year: String!
  }
  type CountryOutput {
    country: Country
    message: String
  }
  input CountryInput {
    area: Int!
    country: String!
    totalPopulation: Int!
    year: String!
  }
  input CountryUpdate {
    id: ID!
    area: Int!
    country: String!
    totalPopulation: Int!
    year: String!
  }
`;
export default typeDefs;
