"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

const maintenanceSchedule = [
  {
    id: "1",
    equipment: "CAT 320D Excavator",
    type: "Routine Maintenance",
    dueDate: "2025-02-15",
    priority: "medium",
    status: "scheduled",
    estimatedCost: 25000,
    description: "Oil change, filter replacement, hydraulic system check",
  },
  {
    id: "2",
    equipment: "Komatsu D65PX Bulldozer",
    type: "Major Repair",
    dueDate: "2024-12-20",
    priority: "high",
    status: "in-progress",
    estimatedCost: 85000,
    description: "Engine overhaul completion",
  },
  {
    id: "3",
    equipment: "SCHWING Concrete Mixer",
    type: "Routine Maintenance",
    dueDate: "2025-01-30",
    priority: "medium",
    status: "scheduled",
    estimatedCost: 15000,
    description: "Drum cleaning, calibration, belt inspection",
  },
  {
    id: "4",
    equipment: "Atlas Copco Generator",
    type: "Routine Maintenance",
    dueDate: "2025-01-15",
    priority: "low",
    status: "scheduled",
    estimatedCost: 8000,
    description: "Filter replacement, fuel system check",
  },
  {
    id: "5",
    equipment: "Professional Tool Set",
    type: "Inspection",
    dueDate: "2025-02-01",
    priority: "low",
    status: "scheduled",
    estimatedCost: 5000,
    description: "Tool condition assessment and replacement",
  },
]

export function MaintenanceSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "scheduled":
        return <Wrench className="h-4 w-4 text-blue-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-DZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const totalEstimatedCost = maintenanceSchedule.reduce((sum, item) => sum + item.estimatedCost, 0)
  const highPriorityCount = maintenanceSchedule.filter((item) => item.priority === "high").length
  const upcomingCount = maintenanceSchedule.filter((item) => item.status === "scheduled").length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Calendar and Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-primary" />
              <span className="font-serif">Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Upcoming</span>
              <Badge variant="outline">{upcomingCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High Priority</span>
              <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline">
                {highPriorityCount}
              </Badge>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Est. Cost</span>
                <span className="text-sm font-bold">{formatCurrency(totalEstimatedCost)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Table */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif">Maintenance Schedule</CardTitle>
              <Button size="sm">
                <Wrench className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceSchedule.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.equipment}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{formatDate(item.dueDate)}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(item.priority)} variant="outline">
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm capitalize">{item.status.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{formatCurrency(item.estimatedCost)}</p>
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
    </div>
  )
}
