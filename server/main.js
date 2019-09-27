import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(express.static("./dist"));

app.listen(process.env.PORT || 3000);
