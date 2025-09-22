const express = require("express");
const router = express.Router();

// Simple random captcha generator
router.get("/", (req, res) => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  res.json({
    question: `What is ${a} + ${b}?`,
    answer: a + b, // ⚠️ For hackathon demo only. In real life, never expose the answer.-->remove this
  });
});

module.exports = router;
