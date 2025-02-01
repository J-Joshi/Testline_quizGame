import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/api/quiz", async (req, res) => {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    const data = await response.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz data" });
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));
