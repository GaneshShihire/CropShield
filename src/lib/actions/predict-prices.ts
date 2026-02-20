'use server';

import {
  predictCropPrices,
  type PredictCropPricesInput,
  type PredictCropPricesOutput,
} from '@/ai/flows/predict-crop-prices';
import { PredictCropPricesInputSchema } from '@/lib/schemas';

type State = {
  result?: PredictCropPricesOutput;
  error?: string;
  success: boolean;
};

export async function predictPricesAction(
  data: PredictCropPricesInput
): Promise<State> {
  const validatedFields = PredictCropPricesInputSchema.safeParse(data);

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
