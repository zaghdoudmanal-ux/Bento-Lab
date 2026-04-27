export default function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body;

    // ici on simule juste une réponse
    return res.status(200).json({
      success: true,
      order: order,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
