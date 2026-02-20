import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Landmark } from "lucide-react";

const schemes = [
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "An insurance service for farmers for their yields. It provides comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.",
    details: "Covers losses due to natural calamities, pests, and diseases. Premiums are low for farmers with the government covering the rest.",
  },
  {
    title: "Minimum Support Price (MSP)",
    description: "A form of market intervention by the Government of India to insure agricultural producers against any sharp fall in farm prices.",
    details: "MSP is announced by the government at the beginning of the sowing season for certain crops on the basis of the recommendations of the Commission for Agricultural Costs and Prices (CACP).",
  },
  {
    title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    description: "Launched with the motto of 'Har Khet Ko Paani', this scheme aims to provide end-to-end solutions in the irrigation supply chain.",
    details: "Focuses on creating sources for assured irrigation, reducing wastage of water, and increasing the availability of water on the farm through micro-irrigation technologies.",
  },
  {
    title: "Kisan Credit Card (KCC) Scheme",
    description: "A scheme that provides farmers with timely access to credit to meet their cultivation needs as well as for non-farm activities.",
    details: "Offers a flexible and simplified procedure for getting credit, with features like a revolving cash credit facility and coverage for post-harvest expenses.",
  },
  {
    title: "Soil Health Card Scheme",
    description: "A government scheme to issue 'Soil Health Cards' to farmers. These cards provide information on the nutrient status of their soil along with recommendations on the appropriate dosage of nutrients for improving soil health and fertility.",
    details: "Aims to promote soil testing and balanced use of fertilizers to enhance crop productivity.",
  },
];


export default function SchemesPage() {
  return (
    <div className="flex flex-col gap-8">
       <div className="animate-slide-in-from-bottom">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Government Schemes
        </h1>
        <p className="text-muted-foreground">
          Explore central and state government initiatives for farmers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <div
            key={scheme.title}
            className="animate-slide-in-from-bottom"
            style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'backwards' }}
          >
            <Card className="flex flex-col h-full">
              <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mb-2">
                      <Landmark className="size-6" />
                  </div>
                <CardTitle className="font-headline">{scheme.title}</CardTitle>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{scheme.details}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
