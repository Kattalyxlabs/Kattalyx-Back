import express from "express";
import dotenv from "dotenv";
import connectMongo from "./config/database.config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import RouteHandler from "./routehandler/v1/handler.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

RouteHandler(app);

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
});

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error);
  }
})();
