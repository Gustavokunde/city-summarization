import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_API_KEY, // only for test purpose,
  dangerouslyAllowBrowser: true,
});

export const getCitiesDetails = async (cities: string[]) => {
  return new Promise(async (resolve, reject) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Bring me the details of the provided array of cities from USA such as image and description in a json format: " +
            cities,
        },
      ],
      temperature: 0.5,
      max_tokens: 4000,
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    if (content) return resolve(JSON.parse(content).cities);
    else return reject();
  });
};
