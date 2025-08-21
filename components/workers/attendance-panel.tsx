"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, CalendarIcon, Users } from "lucide-react"

// Mock attendance data
const mockAttendance = [
  {
    id: "1",
    name: "Ahmed Benali",
    role: "Site Supervisor",
    project: "Luxury Villa Complex",
    status: "present",
    checkIn: "07:30",
    checkOut: "16:45",
    hoursWorked: 9.25,
  },
  {
    id: "2",
    name: "Fatima Khelil",
    role: "Construction Worker",
    project: "Office Building Downtown",
    status: "present",
    checkIn: "08:00",
    checkOut: "17:00",
    hoursWorked: 9,
  },
  {
    id: "3",
    name: "Omar Mansouri",
    role: "Electrician",
    project: "Luxury Villa Complex",
    status: "absent",
    checkIn: "-",
    checkOut: "-",
    hoursWorked: 0,
  },
  {
    id: "4",
    name: "Leila Boumediene",
    role: "Architect",
    project: "Shopping Mall Renovation",
    status: "present",
    checkIn: "09:00",
    checkOut: "18:00",
    hoursWorked: 9,
  },
  {
    id: "5",
    name: "Karim Zidane",
    role: "Heavy Equipment Operator",
    project: "Highway Bridge Repair",
    status: "late",
    checkIn: "09:30",
    checkOut: "-",
    hoursWorked: 0,
  },
  {
    id: "6",
    name: "Nadia Hamdi",
    role: "Safety Inspector",
    project: "Office Building Downtown",
    status: "present",
    checkIn: "08:15",
    checkOut: "17:15",
    hoursWorked: 9,
  },
]

export function AttendancePanel() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedProject, setSelectedProject] = useState("all")

  const filteredAttendance = mockAttendance.filter((record) => {
    if (selectedProject === "all") return true
    return record.project.toLowerCase().includes(selectedProject.toLowerCase())
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200"
      case "absent":
        return "bg-red-100 text-red-800 border-red-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const presentCount = filteredAttendance.filter((r) => r.status === "present").length
  const absentCount = filteredAttendance.filter((r) => r.status === "absent").length
  const lateCount = filteredAttendance.filter((r) => r.status === "late").length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Calendar and Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span className="font-serif">Select Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-serif">Today's Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Present</span>
              <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                {presentCount}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Absent</span>
              <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline">
                {absentCount}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Late</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                {lateCount}
              </Badge>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between font-medium">
                <span className="text-sm">Total</span>
                <span>{filteredAttendance.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif">Daily Attendance</CardTitle>
              <div className="flex items-center space-x-3">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Projects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="villa">Luxury Villa Complex</SelectItem>
                    <SelectItem value="office">Office Building Downtown</SelectItem>
                    <SelectItem value="bridge">Highway Bridge Repair</SelectItem>
                    <SelectItem value="mall">Shopping Mall Renovation</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">Mark Attendance</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours Worked</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.name}</p>
                          <p className="text-sm text-muted-foreground">{record.role}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{record.project}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)} variant="outline">
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-sm">{record.checkIn}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-sm">{record.checkOut}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{record.hoursWorked}h</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
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
