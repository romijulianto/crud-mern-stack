import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

const app = express();

/* add middleware */
app.use(cors());
app.use(express.json());

/* add route to upload Product */
app.use(FileUpload());
/* add route to product */
app.use(ProductRoute);
/* make public folder static file to available acces image url */
app.use(express.static("public"));




app.listen(4000, () => console.log('Server up and Running...'));