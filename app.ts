import express from "express";
import cors from "cors";
import ffmpeg from "./ffmpeg";


const app = express();
app.use(cors())

app.get("/", (req, res) => {
    ffmpeg()
    // return res.status(200).sendFile(`${__dirname}/client.html`)
});

const server = app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});






