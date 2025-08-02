const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const AUTH_KEY = process.env.AUTH_KEY || "cryptoGPT123key";
const SCRIPT_ID = process.env.SCRIPT_ID;

app.get("/", (req, res) => {
  res.json({ message: "GPT Proxy Online" });
});

app.get("/files", async (req, res) => {
  const { ext, minutes, key } = req.query;

  if (key !== AUTH_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid or missing key." });
  }

  const url = `https://script.google.com/macros/s/${SCRIPT_ID}/exec?ext=${ext}&minutes=${minutes}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching from script." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
