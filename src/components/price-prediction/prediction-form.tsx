'use client';

import { useForm, zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { predictPricesAction } from '@/lib/actions/predict-prices';
import { PredictionResult } from './prediction-result';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  crop: z.string().min(2, { message: 'Crop name is required.' }),
  region: z.string().min(2, { message: 'Region is required.' }),
  historicalPriceData: z
    .string()
    .min(10, { message: 'Please provide some historical data.' }),
  weatherForecast: z
    .string()
    .min(10, { message: 'Please provide a weather forecast.' }),
});

const initialState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Predicting Price...
        </>
      ) : (
        'Predict Price'
      )}
    </Button>
  );
}

export function PredictionForm() {
  const [state, formAction] = useFormState(predictPricesAction, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: '',
      region: '',
      historicalPriceData: '',
      weatherForecast: '',
    },
  });

  if (state.error) {
    toast({
      variant: 'destructive',
      title: 'Prediction Failed',
      description: state.error,
    });
    state.error = undefined; // Clear error after showing toast
  }

  const handleTalathiHelper = () => {
    form.reset({
      crop: 'Wheat',
      region: 'Punjab',
      historicalPriceData:
        'Last year prices ranged from $180-$220/ton. Demand is expected to rise by 5% due to export policies. Local supply is stable.',
      weatherForecast:
        'Expect a warmer than average season with scattered rainfall. No major adverse events are forecasted for the next 3 months.',
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <Form {...form}>
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Prediction Inputs</CardTitle>
              <CardDescription>
                Provide data to get a crop price forecast.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Wheat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Punjab" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="historicalPriceData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data & Trends</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Last year prices, market demand..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherForecast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Forecast</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Expected rainfall, temperature..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
                <SubmitButton />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTalathiHelper}
                >
                  Use Talathi Data Helper
                </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <PredictionResult result={state.result} />
    </div>
  );
}
