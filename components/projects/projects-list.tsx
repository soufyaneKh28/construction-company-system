"use client"

import { ProjectCard } from "./project-card"
import { ProjectDetailModal } from "./project-detail-modal"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, DollarSign, Star, TrendingUp } from "lucide-react"

const mockProjects = [
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
    phases: [
      { name: "Foundation", status: "completed", progress: 100 },
      { name: "Structure", status: "in-progress", progress: 75 },
      { name: "Roofing", status: "pending", progress: 0 },
      { name: "Finishing", status: "pending", progress: 0 },
    ],
    workers: ["Ahmed Benali", "Fatima Khelil", "Omar Mansouri", "Leila Boumediene"],
    documents: ["Contract.pdf", "Blueprints.dwg", "Site_Photos.zip"],
  },
  {
    id: "2",
    name: "Office Building Downtown",
    client: "Benali Group",
    type: "Commercial",
    status: "planning",
    progress: 15,
    startDate: "2024-01-10",
    endDate: "2025-06-30",
    budget: 8200000,
    spent: 1230000,
    location: "Oran, Algeria",
    phases: [
      { name: "Planning", status: "in-progress", progress: 60 },
      { name: "Foundation", status: "pending", progress: 0 },
      { name: "Structure", status: "pending", progress: 0 },
      { name: "Interior", status: "pending", progress: 0 },
    ],
    workers: ["Karim Zidane", "Nadia Hamdi"],
    documents: ["Proposal.pdf", "Site_Survey.pdf"],
  },
  {
    id: "3",
    name: "Highway Bridge Repair",
    client: "Sahara Developments",
    type: "Infrastructure",
    status: "on-hold",
    progress: 45,
    startDate: "2024-02-01",
    endDate: "2024-08-15",
    budget: 2800000,
    spent: 1260000,
    location: "Constantine, Algeria",
    phases: [
      { name: "Assessment", status: "completed", progress: 100 },
      { name: "Demolition", status: "completed", progress: 100 },
      { name: "Reconstruction", status: "on-hold", progress: 20 },
      { name: "Testing", status: "pending", progress: 0 },
    ],
    workers: ["Youcef Brahimi", "Samira Belkacem", "Rachid Touati"],
    documents: ["Engineering_Report.pdf", "Safety_Assessment.pdf", "Progress_Photos.zip"],
  },
  {
    id: "4",
    name: "Shopping Mall Renovation",
    client: "Atlas Properties",
    type: "Renovation",
    status: "completed",
    progress: 100,
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    completedDate: "2024-02-25",
    budget: 3200000,
    spent: 3150000,
    finalCost: 3150000,
    clientRating: 5,
    profitMargin: 1.6,
    location: "Annaba, Algeria",
    phases: [
      { name: "Design", status: "completed", progress: 100 },
      { name: "Demolition", status: "completed", progress: 100 },
      { name: "Construction", status: "completed", progress: 100 },
      { name: "Final Inspection", status: "completed", progress: 100 },
    ],
    workers: ["Mehdi Larbi", "Aicha Benaissa", "Tarek Boudiaf", "Zineb Cherif"],
    documents: ["Final_Report.pdf", "Completion_Certificate.pdf", "Before_After_Photos.zip"],
    archiveNotes: "Project completed 3 days ahead of schedule. Client extremely satisfied with quality.",
  },
  {
    id: "5",
    name: "Residential Complex Phase 1",
    client: "Medina Developers",
    type: "Residential",
    status: "completed",
    progress: 100,
    startDate: "2023-05-15",
    endDate: "2023-12-30",
    completedDate: "2023-12-28",
    budget: 6800000,
    spent: 6650000,
    finalCost: 6650000,
    clientRating: 4,
    profitMargin: 2.2,
    location: "Tlemcen, Algeria",
    phases: [
      { name: "Site Preparation", status: "completed", progress: 100 },
      { name: "Foundation", status: "completed", progress: 100 },
      { name: "Structure", status: "completed", progress: 100 },
      { name: "Finishing", status: "completed", progress: 100 },
    ],
    workers: ["Salim Bouteflika", "Khadija Meziane", "Abderrahim Kaci", "Yasmine Boudali"],
    documents: ["Handover_Certificate.pdf", "Warranty_Documents.pdf", "Final_Inspection.pdf"],
    archiveNotes: "Successfully delivered 120 residential units. Minor delays due to weather conditions.",
  },
  {
    id: "6",
    name: "Industrial Warehouse",
    client: "Logistics Solutions",
    type: "Industrial",
    status: "completed",
    progress: 100,
    startDate: "2023-01-20",
    endDate: "2023-08-15",
    completedDate: "2023-08-10",
    budget: 2400000,
    spent: 2280000,
    finalCost: 2280000,
    clientRating: 5,
    profitMargin: 5.0,
    location: "Setif, Algeria",
    phases: [
      { name: "Ground Work", status: "completed", progress: 100 },
      { name: "Steel Structure", status: "completed", progress: 100 },
      { name: "Roofing & Cladding", status: "completed", progress: 100 },
      { name: "Utilities", status: "completed", progress: 100 },
    ],
    workers: ["Farid Benabdallah", "Nawal Cherifi", "Mourad Slimani"],
    documents: ["Structural_Certificate.pdf", "Fire_Safety_Certificate.pdf", "Completion_Report.pdf"],
    archiveNotes: "Excellent project execution. Client awarded us additional Phase 2 contract.",
  },
  {
    id: "7",
    name: "School Renovation Project",
    client: "Ministry of Education",
    type: "Public",
    status: "completed",
    progress: 100,
    startDate: "2022-06-01",
    endDate: "2023-01-31",
    completedDate: "2023-01-28",
    budget: 1800000,
    spent: 1750000,
    finalCost: 1750000,
    clientRating: 4,
    profitMargin: 2.8,
    location: "Batna, Algeria",
    phases: [
      { name: "Assessment", status: "completed", progress: 100 },
      { name: "Structural Repairs", status: "completed", progress: 100 },
      { name: "Interior Renovation", status: "completed", progress: 100 },
      { name: "Safety Upgrades", status: "completed", progress: 100 },
    ],
    workers: ["Hamza Belaid", "Soraya Mammeri", "Djamel Ouali", "Amina Tebboune"],
    documents: ["Safety_Compliance.pdf", "Educational_Standards.pdf", "Handover_Report.pdf"],
    archiveNotes: "Government project completed on time. Enhanced learning environment for 800 students.",
  },
]

interface ProjectsListProps {
  activeTab: "active" | "archived"
  filters: {
    search: string
    client: string
    type: string
    year: string
    status: string
  }
}

export function ProjectsList({ activeTab, filters }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Filter projects based on active tab and filters
  const filteredProjects = mockProjects.filter((project) => {
    // Filter by tab
    if (activeTab === "active" && project.status === "completed") return false
    if (activeTab === "archived" && project.status !== "completed") return false

    // Apply filters
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.client && !project.client.toLowerCase().includes(filters.client.toLowerCase())) return false
    if (filters.type && project.type.toLowerCase() !== filters.type.toLowerCase()) return false
    if (filters.status && project.status !== filters.status) return false
    if (filters.year && !project.startDate.includes(filters.year)) return false

    return true
  })

  const archiveStats = mockProjects
    .filter((p) => p.status === "completed")
    .reduce(
      (acc, project) => {
        acc.totalProjects += 1
        acc.totalRevenue += project.budget
        acc.totalProfit += project.budget - project.finalCost!
        acc.avgRating += project.clientRating!
        return acc
      },
      { totalProjects: 0, totalRevenue: 0, totalProfit: 0, avgRating: 0 },
    )

  if (archiveStats.totalProjects > 0) {
    archiveStats.avgRating = archiveStats.avgRating / archiveStats.totalProjects
  }

  return (
    <>
      {activeTab === "archived" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{archiveStats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Projects delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(archiveStats.totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">DZD from completed projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(archiveStats.totalProfit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">DZD profit generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {archiveStats.avgRating.toFixed(1)}
                <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
              </div>
              <p className="text-xs text-muted-foreground">Client satisfaction</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {activeTab === "archived"
              ? "No archived projects found matching your criteria."
              : "No active projects found matching your criteria."}
          </p>
        </div>
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
