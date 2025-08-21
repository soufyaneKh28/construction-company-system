import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, Users, FolderOpen, FileText, Camera } from "lucide-react"

const quickActions = [
  {
    title: "Add New Project",
    description: "Create a new construction project",
    icon: FolderOpen,
    color: "bg-primary hover:bg-primary/90",
  },
  {
    title: "Record Expense",
    description: "Add materials or equipment costs",
    icon: DollarSign,
    color: "bg-secondary hover:bg-secondary/90",
  },
  {
    title: "Worker Attendance",
    description: "Mark daily worker attendance",
    icon: Users,
    color: "bg-primary hover:bg-primary/90",
  },
  {
    title: "Upload Documents",
    description: "Add project photos or contracts",
    icon: Camera,
    color: "bg-muted-foreground hover:bg-muted-foreground/90",
  },
  {
    title: "Generate Report",
    description: "Create project or financial report",
    icon: FileText,
    color: "bg-secondary hover:bg-secondary/90",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-primary" />
          <span className="font-serif">Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all bg-transparent"
            >
              <div className="flex items-center space-x-2 w-full">
                <action.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">{action.title}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{action.description}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
