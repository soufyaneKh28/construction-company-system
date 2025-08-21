"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, Calculator } from "lucide-react"
import { useState } from "react"

const costData = [
  {
    id: "1",
    equipment: "CAT 320D Excavator",
    type: "owned",
    monthlyRental: 0,
    maintenanceCost: 60000,
    fuelCost: 45000,
    totalCost: 105000,
    utilization: 85,
    costPerHour: 840,
  },
  {
    id: "2",
    equipment: "Liebherr LTM 1050 Crane",
    type: "rented",
    monthlyRental: 180000,
    maintenanceCost: 8000,
    fuelCost: 25000,
    totalCost: 213000,
    utilization: 60,
    costPerHour: 1775,
  },
  {
    id: "3",
    equipment: "Komatsu D65PX Bulldozer",
    type: "owned",
    monthlyRental: 0,
    maintenanceCost: 205000,
    fuelCost: 38000,
    totalCost: 243000,
    utilization: 70,
    costPerHour: 1738,
  },
  {
    id: "4",
    equipment: "SCHWING Concrete Mixer",
    type: "owned",
    monthlyRental: 0,
    maintenanceCost: 12000,
    fuelCost: 22000,
    totalCost: 34000,
    utilization: 90,
    costPerHour: 189,
  },
  {
    id: "5",
    equipment: "Atlas Copco Generator",
    type: "rented",
    monthlyRental: 45000,
    maintenanceCost: 0,
    fuelCost: 15000,
    totalCost: 60000,
    utilization: 40,
    costPerHour: 1000,
  },
  {
    id: "6",
    equipment: "Professional Tool Set",
    type: "owned",
    monthlyRental: 0,
    maintenanceCost: 8500,
    fuelCost: 0,
    totalCost: 8500,
    utilization: 95,
    costPerHour: 45,
  },
]

export function CostTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState("december-2024")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate totals
  const totalRentalCost = costData.reduce((sum, item) => sum + item.monthlyRental, 0)
  const totalMaintenanceCost = costData.reduce((sum, item) => sum + item.maintenanceCost, 0)
  const totalFuelCost = costData.reduce((sum, item) => sum + item.fuelCost, 0)
  const totalCost = costData.reduce((sum, item) => sum + item.totalCost, 0)
  const averageUtilization = Math.round(costData.reduce((sum, item) => sum + item.utilization, 0) / costData.length)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipment Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalCost)}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rental Costs</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalRentalCost)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalRentalCost / totalCost) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Costs</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{formatCurrency(totalMaintenanceCost)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalMaintenanceCost / totalCost) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{averageUtilization}%</div>
            <p className="text-xs text-muted-foreground">Equipment efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif">Equipment Cost Breakdown</CardTitle>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="december-2024">December 2024</SelectItem>
                <SelectItem value="november-2024">November 2024</SelectItem>
                <SelectItem value="october-2024">October 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rental Cost</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead>Fuel Cost</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Cost/Hour</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className="font-medium">{item.equipment}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={item.type === "owned" ? "bg-blue-50" : "bg-orange-50"}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(item.monthlyRental)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(item.maintenanceCost)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(item.fuelCost)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-primary">{formatCurrency(item.totalCost)}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${item.utilization}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{item.utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(item.costPerHour)}</p>
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
