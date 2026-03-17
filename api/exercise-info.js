export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { exercise } = req.body;
  if (!exercise) return res.status(400).json({ error: 'Missing exercise' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Gi meg kort informasjon om øvelsen "${exercise}" for en treningsapp. Svar KUN med HTML (ingen markdown, ingen kodeblokker). Bruk disse seksjonene med <h4> og <p> tagger:
- Muskler som trenes
- Teknikktips (2-3 punkter)
- Vanlige feil
- Progresjon

Hold det kort og praktisk. Svar på norsk.`
        }]
      })
    });

    const data = await response.json();
    const html = data.content?.[0]?.text || '<p>Ingen info tilgjengelig.</p>';
    res.status(200).json({ html });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AI info' });
  }
}
