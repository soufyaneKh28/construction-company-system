"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, User, DollarSign, Clock } from "lucide-react"

interface EquipmentCardProps {
  equipment: any
  onClick: () => void
}

export function EquipmentCard({ equipment, onClick }: EquipmentCardProps) {
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

  const getOwnershipColor = (ownership: string) => {
    return ownership === "owned"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-orange-100 text-orange-800 border-orange-200"
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
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-serif group-hover:text-primary transition-colors">
            {equipment.name}
          </CardTitle>
          <div className="flex flex-col space-y-1">
            <Badge className={getStatusColor(equipment.status)} variant="outline">
              {equipment.status.replace("-", " ")}
            </Badge>
            <Badge className={getOwnershipColor(equipment.ownership)} variant="outline">
              {equipment.ownership}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {equipment.brand} {equipment.model}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Equipment Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {equipment.location}
          </div>

          {equipment.project && (
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {equipment.project}
            </div>
          )}

          {equipment.operator && (
            <div className="flex items-center text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              {equipment.operator}
            </div>
          )}

          {equipment.hoursUsed && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {equipment.hoursUsed} hours used
            </div>
          )}

          {/* Cost Information */}
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            {equipment.ownership === "rented" ? (
              <span>{formatCurrency(equipment.rentalCost)} rental</span>
            ) : (
              <span>{formatCurrency(equipment.currentValue)} value</span>
            )}
          </div>
        </div>

        {/* Maintenance Info */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last Maintenance:</span>
            <span>{formatDate(equipment.lastMaintenance)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Next Maintenance:</span>
            <span>{formatDate(equipment.nextMaintenance)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
