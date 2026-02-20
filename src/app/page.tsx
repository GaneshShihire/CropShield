import { FeatureCard } from '@/components/dashboard/feature-card';
import { WeatherCard } from '@/components/dashboard/weather-card';
import {
  Bot,
  DollarSign,
  Landmark,
  Leaf,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to CropShield
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered partner in modern agriculture.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WeatherCard />
        <FeatureCard
          href="/price-prediction"
          icon={<DollarSign className="size-8" />}
          title="Crop Price Prediction"
          description="Forecast future market prices for your crops."
        />
        <FeatureCard
          href="/disease-detection"
          icon={<Bot className="size-8" />}
          title="Leaf Disease Detection"
          description="Identify plant diseases and get treatment advice."
        />
         <FeatureCard
          href="/schemes"
          icon={<Landmark className="size-8" />}
          title="Government Schemes"
          description="Explore schemes and initiatives for farmers."
        />
      </div>
    </div>
  );
}
