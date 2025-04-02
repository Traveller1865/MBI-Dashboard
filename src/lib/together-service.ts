/**together-service.ts */
export async function askTogether(prompt: string): Promise<string> {
    try {
      const res = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [
            { role: "system", content: "You are a wellness AI." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });
  
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "Together AI gave an empty response.";
    } catch (err) {
      console.error("Together AI error:", err);
      return "Sorry, I had trouble processing that.";
    }
  }
  