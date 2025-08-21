"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Phone, MapPin, Edit, Trash2, UserPlus } from "lucide-react"

// Mock workers data
const mockWorkers = [
  {
    id: "1",
    name: "Ahmed Benali",
    role: "Site Supervisor",
    phone: "+213 555 123 456",
    salaryType: "monthly",
    salary: 85000,
    status: "active",
    project: "Luxury Villa Complex",
    joinDate: "2023-01-15",
    address: "Algiers, Algeria",
    experience: "8 years",
  },
  {
    id: "2",
    name: "Fatima Khelil",
    role: "Construction Worker",
    phone: "+213 555 234 567",
    salaryType: "daily",
    salary: 3500,
    status: "active",
    project: "Office Building Downtown",
    joinDate: "2023-03-20",
    address: "Oran, Algeria",
    experience: "5 years",
  },
  {
    id: "3",
    name: "Omar Mansouri",
    role: "Electrician",
    phone: "+213 555 345 678",
    salaryType: "daily",
    salary: 4200,
    status: "active",
    project: "Luxury Villa Complex",
    joinDate: "2022-11-10",
    address: "Constantine, Algeria",
    experience: "12 years",
  },
  {
    id: "4",
    name: "Leila Boumediene",
    role: "Architect",
    phone: "+213 555 456 789",
    salaryType: "monthly",
    salary: 120000,
    status: "active",
    project: "Shopping Mall Renovation",
    joinDate: "2021-06-01",
    address: "Algiers, Algeria",
    experience: "15 years",
  },
  {
    id: "5",
    name: "Karim Zidane",
    role: "Heavy Equipment Operator",
    phone: "+213 555 567 890",
    salaryType: "daily",
    salary: 4500,
    status: "on-leave",
    project: "Highway Bridge Repair",
    joinDate: "2023-02-14",
    address: "Annaba, Algeria",
    experience: "7 years",
  },
  {
    id: "6",
    name: "Nadia Hamdi",
    role: "Safety Inspector",
    phone: "+213 555 678 901",
    salaryType: "monthly",
    salary: 75000,
    status: "active",
    project: "Office Building Downtown",
    joinDate: "2022-09-05",
    address: "Oran, Algeria",
    experience: "6 years",
  },
]

export function WorkersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWorkers = mockWorkers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || worker.role.toLowerCase().includes(roleFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || worker.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatSalary = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(amount)
    return `${formatted}/${type === "daily" ? "day" : "month"}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-serif">Workers Directory</span>
          <Badge variant="secondary">{filteredWorkers.length} workers</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="supervisor">Site Supervisor</SelectItem>
              <SelectItem value="worker">Construction Worker</SelectItem>
              <SelectItem value="electrician">Electrician</SelectItem>
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="operator">Equipment Operator</SelectItem>
              <SelectItem value="inspector">Safety Inspector</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workers Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Project</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">{worker.experience} experience</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{worker.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {worker.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {worker.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatSalary(worker.salary, worker.salaryType)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{worker.salaryType} rate</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(worker.status)} variant="outline">
                      {worker.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{worker.project}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No workers found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
