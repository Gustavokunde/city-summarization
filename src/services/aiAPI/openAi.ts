import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // only for test purpose,
  dangerouslyAllowBrowser: true,
});

export const getCitiesDetails = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Bring me the details of new york city such as image and description in a json format",
      },
    ],
    temperature: 0.5,
    max_tokens: 4000,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};
