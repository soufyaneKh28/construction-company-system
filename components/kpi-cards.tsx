import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, FolderOpen, DollarSign, Target, AlertTriangle } from "lucide-react"

const kpiData = [
  {
    title: "Ongoing Projects",
    value: "12",
    change: "+2 from last month",
    trend: "up",
    icon: FolderOpen,
    color: "text-primary",
  },
  {
    title: "Average Progress",
    value: "68%",
    change: "+5% from last week",
    trend: "up",
    icon: Target,
    color: "text-secondary",
    progress: 68,
  },
  {
    title: "Total Expenses",
    value: "2,450,000 DZD",
    change: "+12% from last month",
    trend: "up",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Total Income",
    value: "3,200,000 DZD",
    change: "+8% from last month",
    trend: "up",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    title: "Profit/Loss",
    value: "750,000 DZD",
    change: "+15% from last month",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-foreground">{kpi.value}</div>
            {kpi.progress && (
              <div className="mt-2">
                <Progress value={kpi.progress} className="h-2" />
              </div>
            )}
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              {kpi.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
              )}
              {kpi.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
