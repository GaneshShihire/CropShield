import type { PredictCropPricesOutput } from '@/ai/flows/predict-crop-prices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Lightbulb,
  DollarSign,
  Info
} from 'lucide-react';

type PredictionResultProps = {
  result?: PredictCropPricesOutput;
};

export function PredictionResult({ result }: PredictionResultProps) {
  if (!result) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardHeader>
          <div className="p-4 rounded-full bg-primary/10 mx-auto">
            <Info className="size-10 text-primary" />
          </div>
          <CardTitle className="mt-4">Awaiting Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your AI-powered price prediction will appear here once you submit the form.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle className="font-headline">Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 rounded-lg bg-primary/10">
          <h3 className="text-sm font-medium text-primary uppercase tracking-wider">
            Predicted Price
          </h3>
          <p className="text-4xl font-bold text-primary mt-2 flex items-center justify-center gap-2">
            <DollarSign className="size-8" />
            <span>{result.predictedPrice}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <BarChart className="text-accent" />
              Factors Considered
            </h4>
            <div className="flex flex-wrap gap-2 pl-8">
              {result.factorsConsidered.map((factor, index) => (
                <Badge key={index} variant="secondary">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Lightbulb className="text-accent" />
              Recommendations
            </h4>
            <p className="text-sm text-muted-foreground pl-8">{result.recommendations}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
