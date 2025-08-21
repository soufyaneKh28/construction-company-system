import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MessageSquare, Plus, Calendar } from "lucide-react"

const communications = [
  {
    id: "COM-001",
    client: "Société Immobilière El Djazair",
    contact: "Ahmed Benali",
    type: "phone",
    subject: "Project Progress Update",
    date: "2024-01-15",
    time: "14:30",
    duration: "25 min",
    notes:
      "Discussed Villa Hydra project progress. Client satisfied with current timeline. Requested additional bathroom fixtures.",
    followUp: "2024-01-22",
    priority: "medium",
  },
  {
    id: "COM-002",
    client: "COSIDER Construction",
    contact: "Fatima Zerrouki",
    type: "email",
    subject: "Contract Amendment Request",
    date: "2024-01-12",
    time: "09:15",
    duration: "N/A",
    notes:
      "Received request for contract amendment regarding material specifications. Need to review and provide quote.",
    followUp: "2024-01-18",
    priority: "high",
  },
  {
    id: "COM-003",
    client: "Private Client - Karim Messaoudi",
    contact: "Karim Messaoudi",
    type: "meeting",
    subject: "Site Visit and Inspection",
    date: "2024-01-10",
    time: "10:00",
    duration: "2 hours",
    notes:
      "Conducted site visit with client. Reviewed foundation work and discussed next phase timeline. Client approved current progress.",
    followUp: null,
    priority: "low",
  },
  {
    id: "COM-004",
    client: "ENPI",
    contact: "Youcef Brahimi",
    type: "phone",
    subject: "Payment Schedule Discussion",
    date: "2024-01-08",
    time: "16:45",
    duration: "15 min",
    notes: "Discussed upcoming payment schedule for Office Building project. Confirmed payment dates and amounts.",
    followUp: "2024-01-25",
    priority: "medium",
  },
  {
    id: "COM-005",
    client: "Private Client - Amina Boudjemaa",
    contact: "Amina Boudjemaa",
    type: "email",
    subject: "Project Completion Certificate",
    date: "2023-12-20",
    time: "11:30",
    duration: "N/A",
    notes:
      "Sent project completion certificate and final documentation. Client expressed high satisfaction with the work quality.",
    followUp: null,
    priority: "low",
  },
]

export function CommunicationLogs() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return Phone
      case "email":
        return Mail
      case "meeting":
        return MessageSquare
      default:
        return MessageSquare
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "phone":
        return "bg-blue-100 text-blue-800"
      case "email":
        return "bg-green-100 text-green-800"
      case "meeting":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Communication Logs</CardTitle>
              <CardDescription>Track all client communications and follow-ups</CardDescription>
            </div>
            <Button className="bg-construction-primary hover:bg-construction-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Log Communication
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communications.map((comm) => {
              const TypeIcon = getTypeIcon(comm.type)
              return (
                <div key={comm.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <TypeIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{comm.client}</h4>
                        <p className="text-sm text-muted-foreground">{comm.contact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(comm.priority)}>{comm.priority}</Badge>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(comm.type)}`}>
                        {comm.type}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-medium mb-1">{comm.subject}</h5>
                    <p className="text-sm text-muted-foreground">{comm.notes}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>
                        {new Date(comm.date).toLocaleDateString()} at {comm.time}
                      </span>
                      {comm.duration !== "N/A" && <span>Duration: {comm.duration}</span>}
                    </div>
                    {comm.followUp && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Follow-up: {new Date(comm.followUp).toLocaleDateString()}</span>
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
