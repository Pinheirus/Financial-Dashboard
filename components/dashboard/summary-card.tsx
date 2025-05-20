import { 
  ArrowDownIcon, 
  ArrowUpIcon,
  DollarSignIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  currency?: string;
  type?: 'income' | 'expense' | 'neutral';
}

export function SummaryCard({
  title,
  value,
  description,
  icon = <DollarSignIcon className="h-4 w-4" />,
  change,
  currency = 'USD',
  type = 'neutral',
}: SummaryCardProps) {
  const formatValue = () => {
    if (currency === '%') {
      return `${Math.abs(value).toFixed(1)}%`;
    }
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div 
          className={cn(
            "rounded-full p-1.5",
            type === 'income' && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            type === 'expense' && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
            type === 'neutral' && "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue()}</div>
        {(description || change !== undefined) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {change !== undefined && (
              <>
                {change >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span 
                  className={cn(
                    change >= 0 ? "text-green-500" : "text-red-500",
                    "mr-1"
                  )}
                >
                  {Math.abs(change).toFixed(1)}%
                </span>
              </>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}