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


const app = express();



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

  });

  await server.start();
  server.applyMiddleware({ app, path: "/api/devplace" });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server is running at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(`🚀 App is running at http://localhost:3000`);
}

startApolloServer({ typeDefs, resolvers });
