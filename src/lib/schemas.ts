import { z } from 'zod';

export const PredictCropPricesInputSchema = z.object({
  crop: z.string().min(2, { message: 'Crop name must be at least 2 characters.' }).describe('The name of the crop (e.g., "Wheat", "Rice").'),
  region: z.string().min(2, { message: 'Region must be at least 2 characters.' }).describe('The region for which to predict the crop price.'),
  historicalPriceData: z
    .string()
    .optional()
    .describe('Optional: Historical price data and trends for the crop in the specified region. This includes past prices, market demand, and supply dynamics.'),
  weatherForecast: z
    .string()
    .optional()
    .describe('Optional: Current and forecasted weather conditions for the region, including temperature, rainfall, and potential extreme weather events.'),
});
