const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/scan", (req, res) => {
  const data = JSON.stringify({
    content: req.body.content,
    title: "optional title",
    aiModelVersion: "1",
  });

  axios
    .post("https://api.originality.ai/api/v1/scan/ai", data, {
      headers: {
        "X-OAI-API-KEY":
          // your api key
          "YOUR_API",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
