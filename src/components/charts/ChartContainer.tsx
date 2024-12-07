import { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartContainerProps extends PropsWithChildren {
  title: string;
}

export function ChartContainer({ title, children }: ChartContainerProps) {
  return (
    <Card className="bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}