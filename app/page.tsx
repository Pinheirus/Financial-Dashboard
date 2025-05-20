import { ArrowDownIcon, ArrowUpIcon, CreditCardIcon, DollarSignIcon, RefreshCcwIcon, WalletIcon } from "lucide-react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { AccountsSummary } from "@/components/dashboard/accounts-summary";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { MonthlyTrendChart } from "@/components/dashboard/monthly-trend-chart";
import { BudgetProgress } from "@/components/dashboard/budget-progress";
import { DailyExpenseChart } from "@/components/dashboard/daily-expense-chart";
import { financialSummary } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          value={financialSummary.totalBalance}
          icon={<WalletIcon className="h-4 w-4" />}
          type="neutral"
          change={financialSummary.monthlyChange}
          description="vs last month"
        />
        <SummaryCard
          title="Monthly Income"
          value={financialSummary.totalIncome}
          icon={<ArrowUpIcon className="h-4 w-4" />}
          type="income"
        />
        <SummaryCard
          title="Monthly Expenses"
          value={financialSummary.totalExpenses}
          icon={<ArrowDownIcon className="h-4 w-4" />}
          type="expense"
        />
        <SummaryCard
          title="Savings Rate"
          value={financialSummary.savingsRate}
          icon={<RefreshCcwIcon className="h-4 w-4" />}
          change={2.5}
          description="vs last month"
          currency="%"
          type="neutral"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <ChartContainer 
          title="Monthly Trends" 
          description="Income, expenses and savings"
          className="md:col-span-4"
        >
          <MonthlyTrendChart />
        </ChartContainer>
        
        <ChartContainer 
          title="Spending by Category"
          className="md:col-span-3"
        >
          <SpendingChart />
        </ChartContainer>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-6">
          <TransactionList />
          
          <ChartContainer title="Daily Expenses">
            <DailyExpenseChart />
          </ChartContainer>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <AccountsSummary />
          
          <ChartContainer title="Budget Status">
            <BudgetProgress />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}