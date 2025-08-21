"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, Users } from "lucide-react"

const calendarEvents = [
  { date: 15, title: "Villa Project Milestone", type: "milestone", color: "bg-primary" },
  { date: 18, title: "Worker Schedule Review", type: "schedule", color: "bg-secondary" },
  { date: 22, title: "Payment Due - Office Building", type: "payment", color: "bg-destructive" },
  { date: 25, title: "Equipment Maintenance", type: "maintenance", color: "bg-muted-foreground" },
  { date: 28, title: "Client Meeting - New Project", type: "meeting", color: "bg-primary" },
]

const upcomingEvents = [
  { title: "Villa Foundation Completion", date: "Dec 15", time: "09:00", type: "milestone" },
  { title: "Team Meeting", date: "Dec 16", time: "14:00", type: "meeting" },
  { title: "Equipment Delivery", date: "Dec 18", time: "08:00", type: "delivery" },
  { title: "Payment Reminder", date: "Dec 22", time: "All Day", type: "payment" },
]

export function CalendarWidget() {
  const [currentMonth] = useState("December 2024")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-serif">Project Calendar</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentMonth}</span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mini Calendar */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
              const hasEvent = calendarEvents.some((event) => event.date === date)
              const event = calendarEvents.find((event) => event.date === date)
              return (
                <div
                  key={date}
                  className={`p-2 text-sm rounded-md cursor-pointer hover:bg-muted transition-colors ${
                    date === 15 ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {date}
                  {hasEvent && <div className={`w-1 h-1 rounded-full mx-auto mt-1 ${event?.color}`}></div>}
                </div>
              )
            })}
          </div>

          {/* Upcoming Events */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Upcoming Events</h4>
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="flex-shrink-0">
                  {event.type === "milestone" && <AlertCircle className="h-4 w-4 text-primary" />}
                  {event.type === "meeting" && <Users className="h-4 w-4 text-secondary" />}
                  {event.type === "delivery" && <Clock className="h-4 w-4 text-muted-foreground" />}
                  {event.type === "payment" && <AlertCircle className="h-4 w-4 text-destructive" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
