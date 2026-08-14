const { createClient } = require("redis");

module.exports = async (req, res) => {
  if (req.method !== "GET" && req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = req.method === "GET" ? req.query.key : (req.body || {}).key;
  if (key !== process.env.RESULTS_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const client = createClient({ url: process.env.hen_ho_em_bop_REDIS_URL });
  try {
    await client.connect();
    if (req.method === "DELETE") {
      await client.del("submissions");
      res.status(200).json({ ok: true });
      return;
    }
    const raw = await client.lRange("submissions", 0, -1);
    const submissions = raw.map((item) => JSON.parse(item));
    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to load submissions" });
  } finally {
    await client.quit();
  }
};
