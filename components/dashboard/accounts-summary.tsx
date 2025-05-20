"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  Landmark,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { accounts } from "@/lib/data";
import { cn } from "@/lib/utils";

const accountIcons = {
  checking: Landmark,
  savings: PiggyBank,
  credit: CreditCard,
  investment: DollarSign,
  cash: Wallet,
  digital: Wallet,
};

export function AccountsSummary() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  const getAccountIcon = (type: string) => {
    const IconComponent = accountIcons[type as keyof typeof accountIcons] || Wallet;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Accounts Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(totalBalance)}
              </p>
            </div>
            <div className="bg-primary/10 rounded-full p-2">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            {accounts.map((account) => (
              <div 
                key={account.id} 
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    account.type === 'checking' && "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
                    account.type === 'savings' && "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400",
                    account.type === 'credit' && "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
                    account.type === 'investment' && "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
                    account.type === 'cash' && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                    account.type === 'digital' && "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400",
                  )}>
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">Last updated: {new Date(account.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-semibold",
                    account.balance >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                  )}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: account.currency,
                    }).format(account.balance)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}