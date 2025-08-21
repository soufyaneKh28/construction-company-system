"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { EquipmentGrid } from "@/components/equipment/equipment-grid"
import { EquipmentFilters } from "@/components/equipment/equipment-filters"
import { MaintenanceSchedule } from "@/components/equipment/maintenance-schedule"
import { CostTracker } from "@/components/equipment/cost-tracker"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Wrench, DollarSign } from "lucide-react"

export default function EquipmentPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    ownership: "",
  })

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground">Equipment Management</h1>
              <p className="text-muted-foreground">Track and manage your construction equipment</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="equipment" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit">
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center space-x-2">
                <Wrench className="h-4 w-4" />
                <span>Maintenance</span>
              </TabsTrigger>
              <TabsTrigger value="costs" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Costs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="equipment" className="space-y-6">
              <EquipmentFilters filters={filters} onFiltersChange={setFilters} />
              <EquipmentGrid filters={filters} />
            </TabsContent>

            <TabsContent value="maintenance">
              <MaintenanceSchedule />
            </TabsContent>

            <TabsContent value="costs">
              <CostTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
