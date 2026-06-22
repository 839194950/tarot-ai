import OpenAI from "openai";
import { TarotCard, SpreadType } from "./cards";

function getClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseURL: "https://api.deepseek.com",
  });
}

interface ReadingRequest {
  cards: TarotCard[];
  question?: string;
  spreadType: SpreadType;
  positions: string[];
}

export async function generateReading({ cards, question, spreadType, positions }: ReadingRequest): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return `The cards are drawn but the mystic connection is not yet configured. To enable AI readings, set your DeepSeek API key in the environment variables.

**Cards drawn:**
${cards.map((c, i) => `${positions[i] || `Position ${i + 1}`}: ${c.name} (${c.keywords.join(", ")})`).join("\n")}`;
  }

  const cardsContext = cards.map((card, i) => {
    const position = positions[i] || `Position ${i + 1}`;
    return `Card ${i + 1} (${position}): ${card.name} — ${card.keywords.join(", ")}
Upright meaning: ${card.meaningUp}
Reversed meaning: ${card.meaningRev}`;
  }).join("\n\n");

  const systemPrompt = `You are Mystic Sage, a professional tarot reader with deep wisdom in divination. Your readings are insightful, empathetic, and empowering. You provide clear, meaningful interpretations that help seekers find clarity and direction.

Rules:
- Respond ONLY with the reading interpretation. No greetings, no signing off.
- Write in fluent, natural English.
- Be specific and insightful — avoid generic fortune cookie language.
- Connect the cards to a coherent narrative based on their positions.
- Keep the reading to 3-5 paragraphs.
- Tone: warm, wise, encouraging but honest.`;

  const userPrompt = question
    ? `The seeker asks: "${question}"

Here are the cards drawn (${spreadType} spread):

${cardsContext}

Please provide a tarot reading that answers their question and addresses the card positions.`
    : `Here are the cards drawn (${spreadType} spread):

${cardsContext}

Please provide a tarot reading based on the card positions.`;

  const client = getClient();
  const response = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || "The cards are silent today. Please try again.";
}
