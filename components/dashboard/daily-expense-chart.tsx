"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { dailyExpenseData } from '@/lib/data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-sm">
        <p className="text-sm">Day {label}</p>
        <p className="text-sm font-semibold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export function DailyExpenseChart() {
  // Only show every 5th day on smaller screens to avoid label overlap
  const formattedData = dailyExpenseData.map(item => ({
    ...item,
    displayDay: Number(item.day) % 5 === 0 ? item.day : ''
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
          <XAxis 
            dataKey="displayDay" 
            className="text-xs"
            tickMargin={5}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            className="text-xs"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="hsl(var(--chart-4))" 
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}