import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, Clock, UserX, DollarSign, X } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "payment",
    title: "Overdue Payment",
    message: "Office Building project payment is 5 days overdue",
    time: "2 hours ago",
    priority: "high",
    icon: DollarSign,
  },
  {
    id: 2,
    type: "attendance",
    title: "Worker Absence",
    message: "3 workers absent today at Villa Construction site",
    time: "4 hours ago",
    priority: "medium",
    icon: UserX,
  },
  {
    id: 3,
    type: "milestone",
    title: "Milestone Overdue",
    message: "Foundation work for Apartment Complex is 2 days behind",
    time: "1 day ago",
    priority: "high",
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: "reminder",
    title: "Equipment Maintenance",
    message: "Excavator maintenance scheduled for tomorrow",
    time: "1 day ago",
    priority: "low",
    icon: Clock,
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Received",
    message: "Villa Project - Phase 1 payment received (850,000 DZD)",
    time: "2 days ago",
    priority: "low",
    icon: DollarSign,
  },
]

export function NotificationsPanel() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "payment":
        return "text-primary"
      case "attendance":
        return "text-destructive"
      case "milestone":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span className="font-serif">Notifications</span>
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => n.priority === "high").length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <notification.icon className={`h-4 w-4 ${getIconColor(notification.type)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
