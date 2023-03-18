import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import next from "next";
import Country from "./models/country.js";

const app = express();

const dev = process.env.NODE_ENV !== "production"; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config


const db_uri = process.env.DB_URI;
const port = process.env.PORT;

mongoose.connect(
  db_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err
      ? console.log("db connection error", err.message)
      : console.log("database connected successfully");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection timed out"));
const seedData = [
  {
    "country": "Albania",

    "year": "2000",

    "area": 28748,

    "totalPopulation": 3401198,
  },

  {
    "country": "Albania",

    "year": "2001",

    "area": 28748,

    "totalPopulation": 3073734,
  },

  {
    "country": "Albania",

    "year": "2002",

    "area": 28748,

    "totalPopulation": 3093465,
  },

  {
    "country": "Albania",

    "year": "2003",

    "area": 28748,

    "totalPopulation": 3111162,
  },
];

const seedDb = async () => {
  await Country.deleteMany({});
  await Country.insertMany(seedData);
};

seedDb().then(() => {
  console.log("seed data was added successfully")
});


async function startApolloServer({ typeDefs, resolvers }) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.all("*", (req, res, next) => {
    if (req.url === server.graphqlPath) {
      return next();
    }

    return handle(req, res); // for all the routes outside express
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api/countries" });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server is running at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(`🚀 App is running at http://localhost:3000`);
}

startApolloServer({ typeDefs, resolvers });
