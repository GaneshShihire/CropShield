'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
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
import {
  PredictCropPricesInputSchema,
  type PredictCropPricesOutput,
} from '@/ai/flows/predict-crop-prices';

const formSchema = PredictCropPricesInputSchema;
type FormValues = z.infer<typeof formSchema>;

const initialState: {
  result?: PredictCropPricesOutput;
  error?: string;
  success: boolean;
} = {
  success: false,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? (
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
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: '',
      region: '',
      historicalPriceData: '',
      weatherForecast: '',
    },
  });

  async function onSubmit(data: FormValues) {
    startTransition(async () => {
      const resultState = await predictPricesAction(data);
      if (resultState.error) {
        toast({
          variant: 'destructive',
          title: 'Prediction Failed',
          description: resultState.error,
        });
      }
      setState(resultState);
    });
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <SubmitButton isPending={isPending} />
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
