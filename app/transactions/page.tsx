"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowUpDown,
  CalendarIcon,
  ChevronDownIcon,
  FilterIcon,
  Plus,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { categories, transactions } from "@/lib/data";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getSortedTransactions = () => {
    return [...transactions]
      .filter(
        (transaction) =>
          transaction.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) &&
          (!categoryFilter || transaction.category === categoryFilter) &&
          (!statusFilter || transaction.status === statusFilter)
      )
      .sort((a, b) => {
        if (sortColumn === "date") {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortColumn === "amount") {
          return sortDirection === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        } else if (sortColumn === "description") {
          return sortDirection === "asc"
            ? a.description.localeCompare(b.description)
            : b.description.localeCompare(a.description);
        }
        return 0;
      });
  };

  function getCategoryName(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  }

  function getCategoryType(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.type || "expense";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 pb-6">
              <CardTitle className="text-xl font-semibold">All Transactions</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative w-full md:w-64">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1 w-full md:w-auto"
                    >
                      <FilterIcon className="h-3.5 w-3.5" />
                      <span>Category</span>
                      <ChevronDownIcon className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                      All Categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setCategoryFilter(category.id)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1 w-full md:w-auto"
                    >
                      <FilterIcon className="h-3.5 w-3.5" />
                      <span>Status</span>
                      <ChevronDownIcon className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                      All Statuses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                      Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("recurring")}>
                      Recurring
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("description")}
                    >
                      <div className="flex items-center">
                        Description
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors text-right" 
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end">
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedTransactions().map((transaction) => {
                    const categoryType = getCategoryType(transaction.category);
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {format(new Date(transaction.date), "MMM d, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              categoryType === "income" &&
                                "border-green-500 text-green-700 dark:text-green-500",
                              categoryType === "expense" &&
                                "border-red-500 text-red-700 dark:text-red-500",
                              categoryType === "transfer" &&
                                "border-blue-500 text-blue-700 dark:text-blue-500"
                            )}
                          >
                            {getCategoryName(transaction.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              transaction.status === "completed" &&
                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                              transaction.status === "pending" &&
                                "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
                              transaction.status === "recurring" &&
                                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            )}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right font-medium",
                            transaction.amount > 0
                              ? "text-green-600 dark:text-green-500"
                              : "text-red-600 dark:text-red-500"
                          )}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income" className="mt-4">
          {/* Income tab content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Income Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-60 text-muted-foreground">
              Content for income transactions will be shown here.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses" className="mt-4">
          {/* Expenses tab content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-60 text-muted-foreground">
              Content for expense transactions will be shown here.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transfers" className="mt-4">
          {/* Transfers tab content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-60 text-muted-foreground">
              Content for transfer transactions will be shown here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}