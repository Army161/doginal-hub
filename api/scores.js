const scores = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const sorted = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);
    return res.json({ scores: sorted });
  }

  if (req.method === 'POST') {
    const { name, score, dogi } = req.body;
    if (!name || score === undefined) return res.status(400).json({ error: 'Missing fields' });
    scores.push({
      name: String(name).slice(0, 20),
      score: parseInt(score),
      dogi: parseFloat(dogi),
      date: new Date().toISOString()
    });
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 100) scores.splice(100);
    const top10 = scores.slice(0, 10);
    return res.json({ success: true, scores: top10 });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
