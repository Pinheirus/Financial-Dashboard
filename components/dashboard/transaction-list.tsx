"use client";

import { useState } from "react";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  ChevronDownIcon, 
  FilterIcon,
  SearchIcon
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categories, transactions } from "@/lib/data";

export function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredTransactions = transactions
    .filter((transaction) => 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!categoryFilter || transaction.category === categoryFilter)
    )
    .slice(0, 5);

  function getCategoryName(categoryId: string) {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  }
  
  function getCategoryType(categoryId: string) {
    return categories.find(c => c.id === categoryId)?.type || 'expense';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative w-48">
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
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FilterIcon className="h-3.5 w-3.5" />
                <span>Filter</span>
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
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => {
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
                        categoryType === 'income' && "border-green-500 text-green-700 dark:text-green-500",
                        categoryType === 'expense' && "border-red-500 text-red-700 dark:text-red-500",
                        categoryType === 'transfer' && "border-blue-500 text-blue-700 dark:text-blue-500"
                      )}
                    >
                      {getCategoryName(transaction.category)}
                    </Badge>
                  </TableCell>
                  <TableCell 
                    className={cn(
                      "text-right font-medium",
                      transaction.amount > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                    )}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(transaction.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" className="w-full">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}