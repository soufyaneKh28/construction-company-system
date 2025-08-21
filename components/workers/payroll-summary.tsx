"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calculator, Download, Calendar } from "lucide-react"

// Mock payroll data
const mockPayroll = [
  {
    id: "1",
    name: "Ahmed Benali",
    role: "Site Supervisor",
    salaryType: "monthly",
    baseSalary: 85000,
    daysWorked: 22,
    hoursWorked: 198,
    overtime: 8,
    overtimePay: 12000,
    totalEarnings: 97000,
    deductions: 4850,
    netPay: 92150,
    status: "processed",
  },
  {
    id: "2",
    name: "Fatima Khelil",
    role: "Construction Worker",
    salaryType: "daily",
    baseSalary: 3500,
    daysWorked: 20,
    hoursWorked: 180,
    overtime: 5,
    overtimePay: 2625,
    totalEarnings: 72625,
    deductions: 3631,
    netPay: 68994,
    status: "processed",
  },
  {
    id: "3",
    name: "Omar Mansouri",
    role: "Electrician",
    salaryType: "daily",
    baseSalary: 4200,
    daysWorked: 21,
    hoursWorked: 189,
    overtime: 12,
    overtimePay: 7560,
    totalEarnings: 95760,
    deductions: 4788,
    netPay: 90972,
    status: "pending",
  },
  {
    id: "4",
    name: "Leila Boumediene",
    role: "Architect",
    salaryType: "monthly",
    baseSalary: 120000,
    daysWorked: 22,
    hoursWorked: 198,
    overtime: 15,
    overtimePay: 22500,
    totalEarnings: 142500,
    deductions: 7125,
    netPay: 135375,
    status: "processed",
  },
  {
    id: "5",
    name: "Karim Zidane",
    role: "Heavy Equipment Operator",
    salaryType: "daily",
    baseSalary: 4500,
    daysWorked: 18,
    hoursWorked: 162,
    overtime: 3,
    overtimePay: 2025,
    totalEarnings: 83025,
    deductions: 4151,
    netPay: 78874,
    status: "pending",
  },
  {
    id: "6",
    name: "Nadia Hamdi",
    role: "Safety Inspector",
    salaryType: "monthly",
    baseSalary: 75000,
    daysWorked: 22,
    hoursWorked: 198,
    overtime: 6,
    overtimePay: 6750,
    totalEarnings: 81750,
    deductions: 4088,
    netPay: 77662,
    status: "processed",
  },
]

export function PayrollSummary() {
  const [selectedMonth, setSelectedMonth] = useState("december-2024")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayroll = mockPayroll.filter((record) => {
    if (statusFilter === "all") return true
    return record.status === statusFilter
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Calculate totals
  const totalEarnings = filteredPayroll.reduce((sum, record) => sum + record.totalEarnings, 0)
  const totalDeductions = filteredPayroll.reduce((sum, record) => sum + record.deductions, 0)
  const totalNetPay = filteredPayroll.reduce((sum, record) => sum + record.netPay, 0)
  const totalOvertime = filteredPayroll.reduce((sum, record) => sum + record.overtimePay, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalDeductions)}</div>
            <p className="text-xs text-muted-foreground">5% of total earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Payroll</CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalNetPay)}</div>
            <p className="text-xs text-muted-foreground">Ready for processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Pay</CardTitle>
            <Calendar className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalOvertime)}</div>
            <p className="text-xs text-muted-foreground">Extra hours compensation</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif">Monthly Payroll</CardTitle>
            <div className="flex items-center space-x-3">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="december-2024">December 2024</SelectItem>
                  <SelectItem value="november-2024">November 2024</SelectItem>
                  <SelectItem value="october-2024">October 2024</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Days Worked</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayroll.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.role}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.daysWorked} days</p>
                        <p className="text-sm text-muted-foreground">{record.hoursWorked}h total</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">
                        {formatCurrency(
                          record.salaryType === "daily" ? record.baseSalary * record.daysWorked : record.baseSalary,
                        )}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatCurrency(record.overtimePay)}</p>
                        <p className="text-sm text-muted-foreground">{record.overtime}h extra</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(record.totalEarnings)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-destructive">{formatCurrency(record.deductions)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-primary">{formatCurrency(record.netPay)}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)} variant="outline">
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
