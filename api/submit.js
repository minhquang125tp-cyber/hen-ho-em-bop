const { createClient } = require("redis");

const MAX_SUBMISSIONS = 200;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const record = {
    timestamp: new Date().toISOString(),
    food: body.food || null,
    vibe: body.vibe || null,
    round2Answer: body.round2Answer || null,
    restaurant: body.restaurant || null,
    round2Place: body.round2Place || null,
  };

  const client = createClient({ url: process.env.hen_ho_em_bop_REDIS_URL });
  try {
    await client.connect();
    await client.lPush("submissions", JSON.stringify(record));
    await client.lTrim("submissions", 0, MAX_SUBMISSIONS - 1);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission" });
  } finally {
    await client.quit();
  }
};
