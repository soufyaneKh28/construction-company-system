"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectFilters } from "@/components/projects/project-filters"
import { AddProjectModal } from "@/components/projects/add-project-modal"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

const initialProjects = [
  {
    id: "1",
    name: "Luxury Villa Complex",
    client: "Ahmed Construction",
    type: "Residential",
    status: "in-progress",
    progress: 68,
    startDate: "2024-03-15",
    endDate: "2024-12-20",
    budget: 4500000,
    spent: 2850000,
    location: "Algiers, Algeria",
    image: "/luxury-villa-construction-site-with-modern-archite.png",
    phases: [
      { name: "Foundation", status: "completed", progress: 100 },
      { name: "Structure", status: "in-progress", progress: 75 },
      { name: "Roofing", status: "pending", progress: 0 },
      { name: "Finishing", status: "pending", progress: 0 },
    ],
    workers: ["Ahmed Benali", "Fatima Khelil", "Omar Mansouri", "Leila Boumediene"],
    documents: ["Contract.pdf", "Blueprints.dwg", "Site_Photos.zip"],
  },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active")
  const [filters, setFilters] = useState({
    search: "",
    client: "",
    type: "",
    year: "",
    status: "",
  })
  const [projects, setProjects] = useState(initialProjects)

  const handleAddProject = (newProject: any) => {
    setProjects((prev) => [newProject, ...prev])
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground">Projects</h1>
              <p className="text-muted-foreground">Manage your construction projects</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <AddProjectModal onAddProject={handleAddProject}>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </AddProjectModal>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "active"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active Projects
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "archived"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Archived Projects
            </button>
          </div>

          {/* Filters */}
          <ProjectFilters filters={filters} onFiltersChange={setFilters} />

          {/* Projects List */}
          <ProjectsList activeTab={activeTab} filters={filters} projects={projects} onProjectsChange={setProjects} />
        </div>
      </main>
    </div>
  )
}
