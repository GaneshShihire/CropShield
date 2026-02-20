'use server';

import {
  detectLeafDisease,
  type DetectLeafDiseaseOutput,
} from '@/ai/flows/detect-leaf-disease';
import { z } from 'zod';

const detectDiseaseSchema = z.object({
  photoDataUri: z.string().min(1, 'Image is required.'),
  plantDescription: z.string().optional(),
});

type State = {
  result?: DetectLeafDiseaseOutput;
  error?: string;
  success: boolean;
};

export async function detectDiseaseAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = detectDiseaseSchema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
    plantDescription: formData.get('plantDescription'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.photoDataUri?.[0],
    };
  }

  try {
    const result = await detectLeafDisease(validatedFields.data);
    return { result, success: true };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to analyze image: ${errorMessage}` };
  }
}
