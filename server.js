const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, agentRole } = req.body;

  try {
    const response = await axios.post(
  "https://api.deepseek.com/v1/chat/completions",
  {
    model: "deepseek-chat",
    messages: [
      { role: "system", content: agentRole },
      { role: "user", content: message },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error("ChatGPT 请求失败：", error.message);
    res.status(500).json({ error: "ChatGPT 接口调用失败" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ 后端已运行：http://localhost:" + PORT);
});
