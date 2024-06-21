import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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", // Replace with your actual OpenAI API key
  dangerouslyAllowBrowser: true, // "true" is without quotes and consider the security implications
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchSurveyQuestions = async (
  topic,
  retries = 5,
  delayTime = 1000
) => {
  const prompt = `Generate 5 survey questions about ${topic}.`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 5, // Increase the token limit to ensure full responses
        stop: ["\n", ".", "?"],
      });

      const questions = response.choices[0].message.content
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "") // Filter out any empty lines
        .map((question, index) => ({
          label: question,
          type: "text",
          name: `additionalQuestion${index + 1}`,
        }));

      return questions;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Too Many Requests error
        console.warn(`Rate limit exceeded, retrying in ${delayTime} ms...`);
        await delay(delayTime);
      } else {
        console.error("Error fetching additional questions:", error);
        break; // Exit loop on non-rate limit errors
      }
    }
  }

  return [];
};

// Example usage
// fetchSurveyQuestions("customer satisfaction")
//   .then((questions) => console.log(questions))
//   .catch((error) => console.error(error));
