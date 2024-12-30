export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY; // Vercel'de Environment Variable olarak ekleyeceğiz
  
  try {
    // JSON gövdeyi okuyalım
    const { prompt } = JSON.parse(req.body);

    // OpenAI'ye fetch
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const data = await openaiRes.json();
    
    // Cevabı döndürüyoruz
    res.status(200).json(data);
  } catch (err) {
    // Hata durumunda 500
    res.status(500).json({ error: err.message });
  }
}
