import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors(corOpts));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.post("/auth/register", register)

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server PORT: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));