import { PredictionForm } from '@/components/price-prediction/prediction-form';

export default function PricePredictionPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Crop Price Prediction
      </h1>
      <p className="text-muted-foreground">
        Fill in the details below to get an AI-powered price prediction for your
        crop.
      </p>
      <div className="mt-6">
        <PredictionForm />
      </div>
    </div>
  );
}
