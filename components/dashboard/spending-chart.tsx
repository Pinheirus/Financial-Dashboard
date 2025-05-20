"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { categorySpendingData } from "@/lib/data";

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA600', '#8675A9', '#6BCB77', '#F1C93B', '#9775FA'];

export function SpendingChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categorySpendingData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            innerRadius={50}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
            paddingAngle={2}
          >
            {categorySpendingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={{
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}