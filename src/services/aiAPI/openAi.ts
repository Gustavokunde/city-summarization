import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_AI_API_KEY, // only for test purpose,
  dangerouslyAllowBrowser: true,
});

const otherCityInformation = [
  "area",
  "top attractions",
  "climate",
  "cuisine",
  "culture and history",
  "transportation",
  "safety",
  "local tips and recommendations",
];

export const getCitiesDetails = async (cities: string[]) => {
  return new Promise(async (resolve, reject) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Bring me some important information and important facts summarized based on the values provided for each city ${JSON.stringify(
            cities
          )} in a json format with cities split into an array with all properties provided, a brief description and also this other information in an html string format to be shown in a landpage : ${JSON.stringify(
            otherCityInformation
          )} `,
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
