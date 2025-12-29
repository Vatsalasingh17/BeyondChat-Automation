import OpenAI from "openai";

export async function rewriteArticle(original, s1, s2, apiKey) {
  const openai = new OpenAI({ apiKey });

  const prompt = `
Rewrite this article to match writing quality & structure similar to the 2 top-ranking articles.
Preserve facts, improve clarity, expand depth. Do NOT copy text.

Original Article:
${original}

Reference Article 1:
${s1}

Reference Article 2:
${s2}

At the end, add:
"References:"
1) <link1>
2) <link2>
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",   // upgrade model if available
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message.content;
}
