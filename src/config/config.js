import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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", // Replace with your actual OpenAI API key
  dangerouslyAllowBrowser: "true",
});

export const fetchSurveyQuestions = async (topic) => {
  const prompt = `Generate 5 survey questions about ${topic}.`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    const questions = response.choices[0].message.content
      .trim()
      .split("\n")
      .map((question, index) => ({
        label: question,
        type: "text",
        name: `additionalQuestion${index + 1}`,
      }));

    return questions;
  } catch (error) {
    console.error("Error fetching additional questions:", error);
    return [];
  }
};
