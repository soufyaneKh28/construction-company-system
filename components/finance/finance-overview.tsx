import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"

const overviewData = [
  {
    title: "Total Income",
    value: "2,450,000 DA",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    description: "vs last month",
  },
  {
    title: "Total Expenses",
    value: "1,890,000 DA",
    change: "+8.2%",
    trend: "up",
    icon: TrendingDown,
    description: "vs last month",
  },
  {
    title: "Net Profit",
    value: "560,000 DA",
    change: "+24.1%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Outstanding Payments",
    value: "320,000 DA",
    change: "-5.3%",
    trend: "down",
    icon: AlertCircle,
    description: "pending collection",
  },
]

export function FinanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`inline-flex items-center ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {item.change}
                </span>{" "}
                {item.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
