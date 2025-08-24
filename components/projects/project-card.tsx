"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, DollarSign, Users, Star, TrendingUp, CheckCircle } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    client: string
    type: string
    status: string
    progress: number
    startDate: string
    endDate: string
    budget: number
    spent: number
    location: string
    workers: string[]
    image?: string
    completedDate?: string
    finalCost?: number
    clientRating?: number
    profitMargin?: number
    archiveNotes?: string
  }
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
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
      month: "short",
      year: "numeric",
    })
  }

  const isArchived = project.status === "completed"

  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden" onClick={onClick}>
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={`${project.name} construction site`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`} variant="outline">
            {project.status.replace("-", " ")}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-serif group-hover:text-primary transition-colors">
            {project.name}
          </CardTitle>
          {!project.image && (
            <Badge className={getStatusColor(project.status)} variant="outline">
              {project.status.replace("-", " ")}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{project.client}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isArchived && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}

        {isArchived && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Completed</span>
              </div>
              {project.clientRating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{project.clientRating}/5</span>
                </div>
              )}
            </div>

            {project.profitMargin && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Profit Margin
                </div>
                <span className="font-medium text-green-600">{project.profitMargin}%</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {project.location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {isArchived && project.completedDate
              ? `Completed: ${formatDate(project.completedDate)}`
              : `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            {isArchived && project.finalCost
              ? `Final: ${formatCurrency(project.finalCost)}`
              : `${formatCurrency(project.spent)} / ${formatCurrency(project.budget)}`}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {project.workers.length} workers {isArchived ? "involved" : "assigned"}
          </div>
        </div>

        <div className="pt-2">
          <Badge variant="secondary" className="text-xs">
            {project.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
