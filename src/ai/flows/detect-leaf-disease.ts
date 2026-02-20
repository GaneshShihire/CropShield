'use server';
/**
 * @fileOverview A plant leaf disease detection and treatment recommendation AI agent.
 *
 * - detectLeafDisease - A function that handles the leaf disease detection process.
 * - DetectLeafDiseaseInput - The input type for the detectLeafDisease function.
 * - DetectLeafDiseaseOutput - The return type for the detectLeafDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectLeafDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  plantDescription: z
    .string()
    .optional()
    .describe(
      'An optional description of the plant or any observed symptoms prior to uploading the image.'
    ),
});
export type DetectLeafDiseaseInput = z.infer<typeof DetectLeafDiseaseInputSchema>;

const DetectLeafDiseaseOutputSchema = z.object({
  diseaseDetected: z
    .boolean()
    .describe('True if a disease is detected, false otherwise.'),
  diseaseName: z.string().describe('The name of the detected disease, if any.').optional(),
  symptoms: z
    .string()
    .describe('A description of the symptoms observed for the detected disease.')
    .optional(),
  treatmentRecommendations: z
    .string()
    .describe('Recommended steps to treat the detected disease.')
    .optional(),
  preventionTips: z
    .string()
    .describe('Tips to prevent future occurrences of this disease.')
    .optional(),
  confidence: z.string().describe('The confidence level of the detection (e.g., High, Medium, Low).').optional(),
});
export type DetectLeafDiseaseOutput = z.infer<typeof DetectLeafDiseaseOutputSchema>;

export async function detectLeafDisease(
  input: DetectLeafDiseaseInput
): Promise<DetectLeafDiseaseOutput> {
  return detectLeafDiseaseFlow(input);
}

const detectLeafDiseasePrompt = ai.definePrompt({
  name: 'detectLeafDiseasePrompt',
  input: {schema: DetectLeafDiseaseInputSchema},
  output: {schema: DetectLeafDiseaseOutputSchema},
  prompt: `You are an expert agricultural botanist and plant pathologist. Your task is to analyze an image of a plant leaf, identify any diseases present, and provide detailed recommendations for treatment and prevention.

Analyze the provided image and information to determine if a disease is present. If no disease is detected, set 'diseaseDetected' to false and leave other fields blank.

If a disease is detected, populate the following fields accurately and concisely:
- 'diseaseDetected': true
- 'diseaseName': The common name of the disease.
- 'symptoms': A clear description of the symptoms visible in the image and common for this disease.
- 'treatmentRecommendations': Practical, actionable steps a farmer can take to treat the disease. Focus on common, accessible methods.
- 'preventionTips': Advice on how to prevent this disease from recurring in the future.
- 'confidence': Your confidence level in the diagnosis (e.g., 'High', 'Medium', 'Low').

Plant Description (if provided): {{{plantDescription}}}
Photo of leaf: {{media url=photoDataUri}}`,
});

const detectLeafDiseaseFlow = ai.defineFlow(
  {
    name: 'detectLeafDiseaseFlow',
    inputSchema: DetectLeafDiseaseInputSchema,
    outputSchema: DetectLeafDiseaseOutputSchema,
  },
  async input => {
    const {output} = await detectLeafDiseasePrompt(input);
    return output!;
  }
);
