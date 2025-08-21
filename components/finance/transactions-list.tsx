"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { useState } from "react"

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    description: "Villa Hydra - Phase 1 Payment",
    type: "income",
    amount: 850000,
    category: "Project Payment",
    project: "Villa Hydra",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    description: "Cement Purchase - Lafarge",
    type: "expense",
    amount: 120000,
    category: "Materials",
    project: "Apartment Complex Bab Ezzouar",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "2024-01-13",
    description: "Worker Salaries - Week 2",
    type: "expense",
    amount: 180000,
    category: "Payroll",
    project: "Multiple",
    status: "completed",
  },
  {
    id: "TXN-004",
    date: "2024-01-12",
    description: "Equipment Rental - Excavator",
    type: "expense",
    amount: 45000,
    category: "Equipment",
    project: "Office Building Cheraga",
    status: "pending",
  },
  {
    id: "TXN-005",
    date: "2024-01-10",
    description: "Residential Complex - Milestone 2",
    type: "income",
    amount: 1200000,
    category: "Project Payment",
    project: "Residential Complex Douera",
    status: "completed",
  },
]

export function TransactionsList() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter
    const matchesSearch =
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.project.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Track all income and expenses</CardDescription>
          </div>
          <Button className="bg-construction-primary hover:bg-construction-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expense">Expenses Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.project}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "income" ? "default" : "secondary"}>
                    {transaction.type === "income" ? "Income" : "Expense"}
                  </Badge>
                </TableCell>
                <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "income" ? "+" : "-"}
                  {transaction.amount.toLocaleString()} DA
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "completed" ? "default" : "outline"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
