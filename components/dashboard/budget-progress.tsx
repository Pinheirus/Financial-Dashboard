"use client";

import { budgetData } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function BudgetProgress() {
  return (
    <div className="space-y-4">
      {budgetData.slice(0, 5).map((item, index) => {
        const percentSpent = (item.spent / item.budget) * 100;
        const status = percentSpent >= 90 
          ? "danger" 
          : percentSpent >= 75 
          ? "warning" 
          : "success";
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <span>
                ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={percentSpent} 
              className={cn(
                status === "danger" && "bg-red-100 dark:bg-red-950",
                status === "warning" && "bg-amber-100 dark:bg-amber-950",
                status === "success" && "bg-green-100 dark:bg-green-950",
                cn(
                  status === "danger" && "[&>[data-state=complete]]:bg-red-500",
                  status === "warning" && "[&>[data-state=complete]]:bg-amber-500",
                  status === "success" && "[&>[data-state=complete]]:bg-green-500"
                )
              )}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentSpent.toFixed(0)}% spent</span>
              <span className={cn(
                status === "danger" && "text-red-500",
                status === "warning" && "text-amber-500",
                status === "success" && "text-green-500"
              )}>
                ${item.remaining.toLocaleString()} remaining
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}