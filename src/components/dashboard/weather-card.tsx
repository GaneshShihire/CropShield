import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSun, Sun } from 'lucide-react';

const forecast = [
  { day: 'Today', Icon: CloudSun, temp: '28°C' },
  { day: 'Mon', Icon: Sun, temp: '30°C' },
  { day: 'Tue', Icon: CloudRain, temp: '25°C' },
  { day: 'Wed', Icon: CloudDrizzle, temp: '26°C' },
  { day: 'Thu', Icon: CloudLightning, temp: '24°C' },
];

export function WeatherCard() {
  return (
    <Card className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-primary/5">
      <CardHeader>
        <CardTitle className="font-headline">Weather Forecast - Pune, India</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-center">
          {forecast.map(({ day, Icon, temp }) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-sm text-muted-foreground">{day}</span>
              <Icon className="size-8 text-accent" />
              <span className="font-semibold">{temp}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
