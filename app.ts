import express from "express";
import cors from "cors";
import ffmpeg from "./ffmpeg";
import fs from "fs";


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    ffmpeg()
    // return res.status(200).sendFile(`${__dirname}/client.html`)
});

app.get("/hls/:file", async (req, res) => {
    try {
      const file = req.params.file;
      fs.readFile(`./videos/${file}`, (err, data) => {
        if(err) {
          res.status(400);
          return
        }
        res.send(data);
      });
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  });

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});






