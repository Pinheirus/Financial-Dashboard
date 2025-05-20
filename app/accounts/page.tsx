"use client";

import { useState } from "react";
import { ArrowUpDown, Ban as Bank, CreditCard, DollarSign, Download, FilePenLine, PiggyBank, Plus, Trash, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { accounts, accountTypes } from "@/lib/data";

const accountIcons = {
  checking: Bank,
  savings: PiggyBank,
  credit: CreditCard,
  investment: DollarSign,
  cash: Wallet,
  digital: Wallet,
};

export default function AccountsPage() {
  const [sortColumn, setSortColumn] = useState<string>("balance");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getSortedAccounts = () => {
    return [...accounts].sort((a, b) => {
      if (sortColumn === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortColumn === "balance") {
        return sortDirection === "asc" ? a.balance - b.balance : b.balance - a.balance;
      } else if (sortColumn === "type") {
        return sortDirection === "asc"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      } else if (sortColumn === "lastUpdated") {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  };

  const getAccountTypeName = (typeId: string) => {
    return accountTypes.find(t => t.id === typeId)?.name || typeId;
  };

  const getAccountIcon = (type: string) => {
    const IconComponent = accountIcons[type as keyof typeof accountIcons] || Wallet;
    return <IconComponent className="h-5 w-5" />;
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalBalance)}
            </CardTitle>
            <CardDescription>Total Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Across {accounts.length} accounts
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(accounts.filter(a => a.balance > 0).reduce((sum, account) => sum + account.balance, 0))}
            </CardTitle>
            <CardDescription>Total Assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Deposits, investments, and cash
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Math.abs(accounts.filter(a => a.balance < 0).reduce((sum, account) => sum + account.balance, 0)))}
            </CardTitle>
            <CardDescription>Total Liabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Credit cards and loans
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
          <CardDescription>
            Manage all your financial accounts in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors w-[300px]"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Account
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("lastUpdated")}
                >
                  <div className="flex items-center">
                    Last Updated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right" 
                  onClick={() => handleSort("balance")}
                >
                  <div className="flex items-center justify-end">
                    Balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedAccounts().map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
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
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getAccountTypeName(account.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(account.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell 
                    className={cn(
                      "text-right font-semibold",
                      account.balance >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                    )}
                  >
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: account.currency,
                    }).format(account.balance)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="4" r="1" />
                            <circle cx="12" cy="20" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FilePenLine className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Accounts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}