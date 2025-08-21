"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface ProjectFiltersProps {
  filters: {
    search: string
    client: string
    type: string
    year: string
    status: string
  }
  onFiltersChange: (filters: any) => void
}

export function ProjectFilters({ filters, onFiltersChange }: ProjectFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Client Filter */}
      <Select value={filters.client} onValueChange={(value) => updateFilter("client", value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Clients" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-clients">All Clients</SelectItem>
          <SelectItem value="ahmed-construction">Ahmed Construction</SelectItem>
          <SelectItem value="benali-group">Benali Group</SelectItem>
          <SelectItem value="sahara-developments">Sahara Developments</SelectItem>
          <SelectItem value="atlas-properties">Atlas Properties</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-types">All Types</SelectItem>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="infrastructure">Infrastructure</SelectItem>
          <SelectItem value="renovation">Renovation</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-status">All Status</SelectItem>
          <SelectItem value="planning">Planning</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="on-hold">On Hold</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {/* Year Filter */}
      <Select value={filters.year} onValueChange={(value) => updateFilter("year", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-years">All Years</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
