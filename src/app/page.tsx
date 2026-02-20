import { FeatureCard } from '@/components/dashboard/feature-card';
import { WeatherCard } from '@/components/dashboard/weather-card';
import { Bot, DollarSign, Landmark } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative rounded-xl overflow-hidden p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/agriculture/1200/400"
            alt="Agriculture background"
            fill
            className="object-cover"
            data-ai-hint="agriculture field"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div
          className="relative z-10 text-white max-w-2xl animate-slide-in-from-bottom"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline">
            Welcome to CropShield
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Your AI-powered partner in modern agriculture. Get crop price
            predictions, detect leaf diseases, and explore government schemes.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="animate-slide-in-from-bottom"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          <WeatherCard />
        </div>
        <div
          className="animate-slide-in-from-bottom"
          style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
        >
          <FeatureCard
            href="/price-prediction"
            icon={<DollarSign className="size-8" />}
            title="Crop Price Prediction"
            description="Forecast future market prices for your crops."
          />
        </div>
        <div
          className="animate-slide-in-from-bottom"
          style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
        >
          <FeatureCard
            href="/disease-detection"
            icon={<Bot className="size-8" />}
            title="Leaf Disease Detection"
            description="Identify plant diseases and get treatment advice."
          />
        </div>
        <div
          className="animate-slide-in-from-bottom"
          style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}
        >
          <FeatureCard
            href="/schemes"
            icon={<Landmark className="size-8" />}
            title="Government Schemes"
            description="Explore schemes and initiatives for farmers."
          />
        </div>
      </div>
    </div>
  );
}
