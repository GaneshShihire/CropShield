'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type FeatureCardProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  href,
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className={cn("h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <ArrowRight className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <CardTitle className="pt-4 font-headline">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
