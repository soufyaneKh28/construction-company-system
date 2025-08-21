import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download } from "lucide-react"

const monthlyData = [
  { month: "Jan", income: 2450000, expenses: 1890000, profit: 560000 },
  { month: "Feb", income: 2680000, expenses: 2100000, profit: 580000 },
  { month: "Mar", income: 3200000, expenses: 2450000, profit: 750000 },
  { month: "Apr", income: 2890000, expenses: 2200000, profit: 690000 },
  { month: "May", income: 3450000, expenses: 2680000, profit: 770000 },
  { month: "Jun", income: 3100000, expenses: 2400000, profit: 700000 },
]

const expenseCategories = [
  { name: "Materials", value: 45, color: "#FF6B35" },
  { name: "Labor", value: 30, color: "#F7931E" },
  { name: "Equipment", value: 15, color: "#FFD23F" },
  { name: "Overhead", value: 10, color: "#06D6A0" },
]

const projectProfitability = [
  { project: "Villa Hydra", revenue: 1200000, cost: 850000, profit: 350000, margin: 29.2 },
  { project: "Apartment Complex", revenue: 2800000, cost: 2100000, profit: 700000, margin: 25.0 },
  { project: "Office Building", revenue: 1800000, cost: 1350000, profit: 450000, margin: 25.0 },
  { project: "Residential Complex", revenue: 3200000, cost: 2400000, profit: 800000, margin: 25.0 },
]

export function FinancialReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Financial Reports</h3>
          <p className="text-sm text-muted-foreground">Comprehensive financial analysis and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income vs Expenses</CardTitle>
            <CardDescription>Track financial performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} DA`} />
                <Bar dataKey="income" fill="#FF6B35" name="Income" />
                <Bar dataKey="expenses" fill="#F7931E" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
            <CardDescription>Monthly profit analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} DA`} />
                <Line type="monotone" dataKey="profit" stroke="#FF6B35" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Distribution of expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Profitability</CardTitle>
            <CardDescription>Profit margins by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectProfitability.map((project) => (
                <div key={project.project} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.project}</h4>
                    <p className="text-sm text-muted-foreground">Revenue: {project.revenue.toLocaleString()} DA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+{project.profit.toLocaleString()} DA</p>
                    <p className="text-sm text-muted-foreground">{project.margin}% margin</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
