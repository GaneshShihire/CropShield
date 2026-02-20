'use server';
/**
 * @fileOverview A Genkit flow for predicting future crop market prices.
 *
 * - predictCropPrices - A function that handles the crop price prediction process.
 * - PredictCropPricesInput - The input type for the predictCropPrices function.
 * - PredictCropPricesOutput - The return type for the predictCropPrices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { PredictCropPricesInputSchema } from '@/lib/schemas';

const GetGovernmentSchemesInputSchema = z.object({
  crop: z.string().describe('The name of the crop (e.g., "Wheat", "Rice").'),
  region: z.string().describe('The region for which to find government schemes.'),
});

const GetGovernmentSchemesOutputSchema = z
  .array(z.string())
  .describe('A list of relevant government schemes and their details.');

const getGovernmentSchemes = ai.defineTool(
  {
    name: 'getGovernmentSchemes',
    description: 'Provides information about relevant government schemes for a given crop and region.',
    inputSchema: GetGovernmentSchemesInputSchema,
    outputSchema: GetGovernmentSchemesOutputSchema,
  },
  async input => {
    // In a real application, this would fetch data from a database or external API.
    // For this implementation, return mock data based on input.
    if (input.crop.toLowerCase() === 'wheat' && input.region.toLowerCase() === 'punjab') {
      return [
        "MSP for Wheat: The government has set a Minimum Support Price (MSP) for wheat, ensuring a guaranteed price for farmers.",
        "Subsidies on Fertilizers: Farmers in Punjab can avail subsidies on specific fertilizers for wheat cultivation.",
        "Crop Insurance Scheme: Pradhan Mantri Fasal Bima Yojana (PMFBY) provides insurance coverage for crop losses due to natural calamities.",
      ];
    } else if (input.crop.toLowerCase() === 'rice' && input.region.toLowerCase() === 'tamil nadu') {
      return [
        "MSP for Rice: Government announced MSP for paddy (rice) to support farmers.",
        "Irrigation Support Schemes: Schemes like PMKSY (Pradhan Mantri Krishi Sinchayee Yojana) offer assistance for irrigation infrastructure.",
      ];
    } else if (input.crop.toLowerCase() === 'corn' && input.region.toLowerCase() === 'iowa') {
      return [
        "Farm Bill Subsidies: Federal subsidies for corn production, including crop insurance and direct payments.",
        "Ethanol Production Incentives: Policies encouraging ethanol use, which drives demand for corn."
      ];
    } else {
      return ['No specific government schemes found for this crop and region combination that significantly impact price directly.'];
    }
  }
);
export type PredictCropPricesInput = z.infer<typeof PredictCropPricesInputSchema>;

const PredictCropPricesOutputSchema = z.object({
  predictedPrice: z.string().describe('The predicted future market price for the crop.'),
  factorsConsidered: z
    .array(z.string())
    .describe('A list of key factors considered in the prediction, including government schemes if relevant.'),
  recommendations: z.string().describe('Recommendations for farmers based on the prediction to maximize profits.'),
});
export type PredictCropPricesOutput = z.infer<typeof PredictCropPricesOutputSchema>;

export async function predictCropPrices(input: PredictCropPricesInput): Promise<PredictCropPricesOutput> {
  return predictCropPricesFlow(input);
}

const predictCropPricesPrompt = ai.definePrompt({
  name: 'predictCropPricesPrompt',
  input: {schema: PredictCropPricesInputSchema},
  output: {schema: PredictCropPricesOutputSchema},
  tools: [getGovernmentSchemes],
  prompt: `You are an AI assistant specialized in agricultural market analysis. Your task is to predict future market prices for specific crops in given regions, considering various economic, environmental, and governmental factors.

Predict the future market price for {{{crop}}} in the {{{region}}} region.

Consider the following data if provided:
{{#if historicalPriceData}}
Historical Price Data and Trends: {{{historicalPriceData}}}
{{/if}}
{{#if weatherForecast}}
Weather Forecast: {{{weatherForecast}}}
{{/if}}

Analyze all available factors thoroughly and provide a predicted price, a list of the key factors that influenced your prediction (including any government schemes if relevant), and recommendations for farmers to maximize their profits. Make sure to use the \`getGovernmentSchemes\` tool if you believe government schemes are relevant to this prediction. If historical data or weather forecast are not provided, base your prediction on general knowledge for the crop and region.`,
});

const predictCropPricesFlow = ai.defineFlow(
  {
    name: 'predictCropPricesFlow',
    inputSchema: PredictCropPricesInputSchema,
    outputSchema: PredictCropPricesOutputSchema,
  },
  async input => {
    const {output} = await predictCropPricesPrompt(input);
    return output!;
  }
);
