import type { DetectLeafDiseaseOutput } from '@/ai/flows/detect-leaf-disease';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  Info,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import Image from 'next/image';

type DetectionResultProps = {
  result?: DetectLeafDiseaseOutput;
  uploadedImage: string | null;
};

export function DetectionResult({
  result,
  uploadedImage,
}: DetectionResultProps) {
  if (!result) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardHeader>
          <div className="p-4 rounded-full bg-primary/10 mx-auto">
            <Info className="size-10 text-primary" />
          </div>
          <CardTitle className="mt-4">Awaiting Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Upload an image of a plant leaf and click "Analyze" to see the AI-powered diagnosis here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Analysis Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {uploadedImage && (
          <div className="relative">
            <Image
              src={uploadedImage}
              alt="Analyzed leaf"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full aspect-[16/9]"
              data-ai-hint="plant leaf"
            />
          </div>
        )}

        {result.diseaseDetected ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-2xl font-semibold text-destructive flex items-center gap-2">
                <AlertCircle /> {result.diseaseName}
              </h3>
              {result.confidence && (
                <Badge variant="destructive">
                  Confidence: {result.confidence}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <ResultSection icon={<Thermometer className="text-primary" />} title="Symptoms">
                <p>{result.symptoms}</p>
              </ResultSection>
              <ResultSection icon={<HeartPulse className="text-primary" />} title="Treatment Recommendations">
                <p>{result.treatmentRecommendations}</p>
              </ResultSection>
              <ResultSection icon={<ShieldCheck className="text-primary" />} title="Prevention Tips">
                <p>{result.preventionTips}</p>
              </ResultSection>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="size-16 mx-auto text-green-600" />
            <h3 className="text-2xl font-semibold mt-4 text-green-700">
              No Disease Detected
            </h3>
            <p className="mt-2 text-muted-foreground">
              The analysis did not find any clear signs of disease. The plant
              appears to be healthy.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ResultSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
        {icon}
        {title}
      </h4>
      <div className="pl-8 text-sm text-muted-foreground border-l-2 border-primary/20 ml-2">
        {children}
      </div>
    </div>
  );
}
