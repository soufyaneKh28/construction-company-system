import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

const budgetCategories = [
  {
    category: "Materials",
    budgeted: 800000,
    actual: 720000,
    variance: -80000,
    percentage: 90,
    status: "under",
  },
  {
    category: "Labor",
    budgeted: 600000,
    actual: 650000,
    variance: 50000,
    percentage: 108.3,
    status: "over",
  },
  {
    category: "Equipment",
    budgeted: 300000,
    actual: 285000,
    variance: -15000,
    percentage: 95,
    status: "under",
  },
  {
    category: "Overhead",
    budgeted: 200000,
    actual: 220000,
    variance: 20000,
    percentage: 110,
    status: "over",
  },
  {
    category: "Subcontractors",
    budgeted: 400000,
    actual: 380000,
    variance: -20000,
    percentage: 95,
    status: "under",
  },
]

const projectBudgets = [
  {
    project: "Villa Hydra",
    totalBudget: 1200000,
    spent: 850000,
    remaining: 350000,
    completion: 70.8,
    status: "on_track",
  },
  {
    project: "Apartment Complex Bab Ezzouar",
    totalBudget: 2800000,
    spent: 2100000,
    remaining: 700000,
    completion: 75,
    status: "on_track",
  },
  {
    project: "Office Building Cheraga",
    totalBudget: 1800000,
    spent: 1450000,
    remaining: 350000,
    completion: 80.6,
    status: "at_risk",
  },
  {
    project: "Residential Complex Douera",
    totalBudget: 3200000,
    spent: 2400000,
    remaining: 800000,
    completion: 75,
    status: "on_track",
  },
]

export function BudgetAnalysis() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "under":
        return "default"
      case "over":
        return "destructive"
      case "on_track":
        return "default"
      case "at_risk":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getVarianceIcon = (variance: number) => {
    return variance > 0 ? TrendingUp : TrendingDown
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Analysis</CardTitle>
          <CardDescription>Compare budgeted amounts with actual spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((item) => {
              const VarianceIcon = getVarianceIcon(item.variance)
              return (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.category}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status === "under" ? "Under Budget" : "Over Budget"}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <VarianceIcon className={`h-4 w-4 ${item.variance > 0 ? "text-red-500" : "text-green-500"}`} />
                        <span className={`text-sm ${item.variance > 0 ? "text-red-500" : "text-green-500"}`}>
                          {Math.abs(item.variance).toLocaleString()} DA
                        </span>
                      </div>
                    </div>
                  </div>

                  <Progress value={item.percentage} className="h-2" />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Budgeted: {item.budgeted.toLocaleString()} DA</span>
                    <span>
                      Actual: {item.actual.toLocaleString()} DA ({item.percentage}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Budget Status</CardTitle>
          <CardDescription>Track budget utilization across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectBudgets.map((project) => (
              <div key={project.project} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{project.project}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(project.status)}>
                      {project.status === "on_track" ? "On Track" : "At Risk"}
                    </Badge>
                    {project.status === "at_risk" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  </div>
                </div>

                <Progress value={project.completion} className="h-2 mb-2" />

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Budget</p>
                    <p className="font-medium">{project.totalBudget.toLocaleString()} DA</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spent</p>
                    <p className="font-medium">{project.spent.toLocaleString()} DA</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium">{project.remaining.toLocaleString()} DA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
