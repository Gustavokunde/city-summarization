import OpenAI from "openai";
import { CityDetails } from "../../store/cities/cities";
import { Params } from "../params";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const otherCityInformation = [
  "most popular attractions in property top_attractions in array format",
  "climate",
  "cuisine",
  "culture_history",
  "male_population_amount",
  "female_population_amount",
  "transportation",
  "safety",
  "local_tips",
];

export const getCitiesDetails = async (
  cities: unknown,
  config: Params | null
): Promise<CityDetails[]> => {
  return new Promise(async (resolve, reject) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Provide the following information to be shown in a land page for each of those cities ${JSON.stringify(
            cities
          )} based in the ${
            config?.countryCode
          } in a json format with cities splitted into an array adding those properties: ${JSON.stringify(
            otherCityInformation
          )} `,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;

    if (content) {
      const contentParsed = JSON.parse(content);
      return resolve(contentParsed.cities || contentParsed);
    } else
      return reject(
        "An error occurred and we couldn't find any of the provided cities"
      );
  });
};
