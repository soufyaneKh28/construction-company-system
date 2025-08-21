import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinanceOverview } from "@/components/finance/finance-overview"
import { TransactionsList } from "@/components/finance/transactions-list"
import { PaymentReminders } from "@/components/finance/payment-reminders"
import { FinancialReports } from "@/components/finance/financial-reports"
import { BudgetAnalysis } from "@/components/finance/budget-analysis"

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-construction-dark">Finance Management</h1>
        <p className="text-muted-foreground">Track income, expenses, and financial performance</p>
      </div>

      <FinanceOverview />

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reminders">Payment Reminders</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionsList />
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <PaymentReminders />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <BudgetAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
