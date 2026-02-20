import { DetectionForm } from '@/components/disease-detection/detection-form';

export default function DiseaseDetectionPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Leaf Disease Detection
      </h1>
      <p className="text-muted-foreground">
        Upload a photo of a plant leaf to detect diseases and get treatment
        recommendations.
      </p>
      <div className="mt-6">
        <DetectionForm />
      </div>
    </div>
  );
}
