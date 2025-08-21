"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Calendar, User, DollarSign, Clock, Wrench, Edit, FileText } from "lucide-react"

interface EquipmentDetailModalProps {
  equipment: any
  isOpen: boolean
  onClose: () => void
}

export function EquipmentDetailModal({ equipment, isOpen, onClose }: EquipmentDetailModalProps) {
  if (!equipment) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-use":
        return "bg-primary/10 text-primary border-primary/20"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "out-of-service":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-DZ", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const totalMaintenanceCost = equipment.maintenanceCosts?.reduce((sum: number, cost: any) => sum + cost.cost, 0) || 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-serif">{equipment.name}</DialogTitle>
              <p className="text-muted-foreground mt-1">
                {equipment.brand} {equipment.model}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(equipment.status)} variant="outline">
                {equipment.status.replace("-", " ")}
              </Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Equipment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Equipment Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Location:</span>
                    {equipment.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Current Project:</span>
                    {equipment.project || "Not assigned"}
                  </div>
                  {equipment.operator && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="font-medium mr-2">Operator:</span>
                      {equipment.operator}
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Hours Used:</span>
                    {equipment.hoursUsed} hours
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Ownership:</span>
                    <Badge variant="outline">{equipment.ownership}</Badge>
                  </div>
                  {equipment.ownership === "owned" ? (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Purchase Price:</span>
                        <span>{formatCurrency(equipment.purchasePrice)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Current Value:</span>
                        <span>{formatCurrency(equipment.currentValue)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Purchase Date:</span>
                        <span>{formatDate(equipment.purchaseDate)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Rental Cost:</span>
                        <span>{formatCurrency(equipment.rentalCost)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Daily Rate:</span>
                        <span>{formatCurrency(equipment.dailyRate)}/day</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Rental Period:</span>
                        <span>
                          {formatDate(equipment.rentalStart)} - {formatDate(equipment.rentalEnd)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {equipment.fuelConsumption && (
                  <div className="text-sm">
                    <span className="font-medium">Fuel Consumption:</span>
                    <p className="text-muted-foreground">{equipment.fuelConsumption}</p>
                  </div>
                )}
                {equipment.maxCapacity && (
                  <div className="text-sm">
                    <span className="font-medium">Max Capacity:</span>
                    <p className="text-muted-foreground">{equipment.maxCapacity}</p>
                  </div>
                )}
                {equipment.capacity && (
                  <div className="text-sm">
                    <span className="font-medium">Capacity:</span>
                    <p className="text-muted-foreground">{equipment.capacity}</p>
                  </div>
                )}
                {equipment.powerOutput && (
                  <div className="text-sm">
                    <span className="font-medium">Power Output:</span>
                    <p className="text-muted-foreground">{equipment.powerOutput}</p>
                  </div>
                )}
                {equipment.quantity && (
                  <div className="text-sm">
                    <span className="font-medium">Quantity:</span>
                    <p className="text-muted-foreground">{equipment.quantity} items</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Maintenance Schedule</h3>
              <Button variant="outline" size="sm">
                <Wrench className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Last Maintenance</h4>
                <p className="text-sm text-muted-foreground">{formatDate(equipment.lastMaintenance)}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Next Maintenance</h4>
                <p className="text-sm text-muted-foreground">{formatDate(equipment.nextMaintenance)}</p>
              </div>
            </div>

            {equipment.maintenanceCosts && equipment.maintenanceCosts.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Maintenance History</h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {equipment.maintenanceCosts.map((maintenance: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(maintenance.date)}</TableCell>
                          <TableCell>{maintenance.description}</TableCell>
                          <TableCell className="text-right">{formatCurrency(maintenance.cost)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <h3 className="text-lg font-semibold">Cost Analysis</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Total Maintenance</h4>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(totalMaintenanceCost)}</p>
              </div>

              {equipment.ownership === "owned" ? (
                <>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Depreciation</h4>
                    <p className="text-2xl font-bold">
                      {formatCurrency(equipment.purchasePrice - equipment.currentValue)}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Current Value</h4>
                    <p className="text-2xl font-bold">{formatCurrency(equipment.currentValue)}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Total Rental</h4>
                    <p className="text-2xl font-bold">{formatCurrency(equipment.rentalCost)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Daily Rate</h4>
                    <p className="text-2xl font-bold">{formatCurrency(equipment.dailyRate)}</p>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Equipment Documents</h3>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="space-y-3">
              {[
                "Purchase_Invoice.pdf",
                "Warranty_Certificate.pdf",
                "Maintenance_Manual.pdf",
                "Safety_Inspection.pdf",
              ].map((document, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{document}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
