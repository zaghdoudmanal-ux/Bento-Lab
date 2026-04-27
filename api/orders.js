export default function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body;

    return res.status(200).json({
      success: true,
      order
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
