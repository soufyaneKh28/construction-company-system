"use client"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { WorkersTable } from "@/components/workers/workers-table"
import { AttendancePanel } from "@/components/workers/attendance-panel"
import { PayrollSummary } from "@/components/workers/payroll-summary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Calendar, DollarSign } from "lucide-react"

export default function WorkersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground">Workers Management</h1>
              <p className="text-muted-foreground">Manage your construction workforce</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Payroll
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Worker
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="workers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit">
              <TabsTrigger value="workers" className="flex items-center space-x-2">
                <span>Workers</span>
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="payroll" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Payroll</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workers">
              <WorkersTable />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendancePanel />
            </TabsContent>

            <TabsContent value="payroll">
              <PayrollSummary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
