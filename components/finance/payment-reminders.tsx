import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle, Phone, Mail } from "lucide-react"

const paymentReminders = [
  {
    id: "PAY-001",
    client: "Société Immobilière El Djazair",
    project: "Villa Hydra",
    amount: 450000,
    dueDate: "2024-01-20",
    status: "overdue",
    daysPastDue: 5,
    contact: {
      phone: "+213 21 123 456",
      email: "contact@sid-dz.com",
    },
  },
  {
    id: "PAY-002",
    client: "COSIDER Construction",
    project: "Apartment Complex Bab Ezzouar",
    amount: 680000,
    dueDate: "2024-01-25",
    status: "due_soon",
    daysPastDue: 0,
    contact: {
      phone: "+213 21 789 012",
      email: "projects@cosider.dz",
    },
  },
  {
    id: "PAY-003",
    client: "Entreprise Nationale de Promotion Immobilière",
    project: "Office Building Cheraga",
    amount: 320000,
    dueDate: "2024-02-01",
    status: "upcoming",
    daysPastDue: 0,
    contact: {
      phone: "+213 21 345 678",
      email: "finance@enpi.dz",
    },
  },
  {
    id: "PAY-004",
    client: "Private Client - Ahmed Benali",
    project: "Residential Complex Douera",
    amount: 150000,
    dueDate: "2024-01-18",
    status: "paid",
    daysPastDue: 0,
    contact: {
      phone: "+213 555 123 456",
      email: "a.benali@email.com",
    },
  },
]

export function PaymentReminders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "destructive"
      case "due_soon":
        return "secondary"
      case "upcoming":
        return "outline"
      case "paid":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue":
        return AlertTriangle
      case "due_soon":
        return Clock
      case "upcoming":
        return Clock
      case "paid":
        return CheckCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Reminders</CardTitle>
          <CardDescription>Track outstanding payments and due dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentReminders.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status)
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <StatusIcon
                      className={`h-5 w-5 ${
                        payment.status === "overdue"
                          ? "text-red-500"
                          : payment.status === "due_soon"
                            ? "text-yellow-500"
                            : payment.status === "paid"
                              ? "text-green-500"
                              : "text-blue-500"
                      }`}
                    />
                    <div>
                      <h4 className="font-semibold">{payment.client}</h4>
                      <p className="text-sm text-muted-foreground">{payment.project}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                        {payment.status === "overdue" && (
                          <span className="text-red-500 ml-2">({payment.daysPastDue} days overdue)</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount.toLocaleString()} DA</p>
                      <Badge variant={getStatusColor(payment.status)}>
                        {payment.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>

                    {payment.status !== "paid" && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
