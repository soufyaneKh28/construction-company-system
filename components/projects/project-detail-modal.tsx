"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, FileText, Download, Edit } from "lucide-react"

interface ProjectDetailModalProps {
  project: any
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null

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
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-serif">{project.name}</DialogTitle>
              <p className="text-muted-foreground mt-1">{project.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(project.status)} variant="outline">
                {project.status.replace("-", " ")}
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
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Location:</span>
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Duration:</span>
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium mr-2">Type:</span>
                    {project.type}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Total Budget:</span>
                    <span>{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Amount Spent:</span>
                    <span>{formatCurrency(project.spent)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Remaining:</span>
                    <span className="text-primary">{formatCurrency(project.budget - project.spent)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="phases" className="space-y-4">
            <h3 className="text-lg font-semibold">Project Phases</h3>
            <div className="space-y-4">
              {project.phases.map((phase: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{phase.name}</h4>
                    <Badge className={getStatusColor(phase.status)} variant="outline">
                      {phase.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <h3 className="text-lg font-semibold">Assigned Workers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.workers.map((worker: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{worker}</p>
                    <p className="text-sm text-muted-foreground">Construction Worker</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Project Documents</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
            <div className="space-y-3">
              {project.documents.map((document: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{document}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
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
