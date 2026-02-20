'use server';

import {
  predictCropPrices,
  type PredictCropPricesOutput,
} from '@/ai/flows/predict-crop-prices';
import { z } from 'zod';

const predictPricesSchema = z.object({
  crop: z.string().min(1, 'Crop name is required.'),
  region: z.string().min(1, 'Region is required.'),
  historicalPriceData: z
    .string()
    .min(1, 'Historical price data is required.'),
  weatherForecast: z.string().min(1, 'Weather forecast is required.'),
});

type State = {
  result?: PredictCropPricesOutput;
  error?: string;
  success: boolean;
};

export async function predictPricesAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = predictPricesSchema.safeParse({
    crop: formData.get('crop'),
    region: formData.get('region'),
    historicalPriceData: formData.get('historicalPriceData'),
    weatherForecast: formData.get('weatherForecast'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0] || 'Invalid input.';
    return {
      success: false,
      error: firstError,
    };
  }

  try {
    const result = await predictCropPrices(validatedFields.data);
    return { result, success: true };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { success: false, error: `Prediction failed: ${errorMessage}` };
  }
}
