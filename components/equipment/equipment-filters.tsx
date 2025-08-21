"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface EquipmentFiltersProps {
  filters: {
    search: string
    status: string
    type: string
    ownership: string
  }
  onFiltersChange: (filters: any) => void
}

export function EquipmentFilters({ filters, onFiltersChange }: EquipmentFiltersProps) {
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
          placeholder="Search equipment..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-status">All Status</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="in-use">In Use</SelectItem>
          <SelectItem value="maintenance">Under Maintenance</SelectItem>
          <SelectItem value="out-of-service">Out of Service</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-types">All Types</SelectItem>
          <SelectItem value="excavator">Excavator</SelectItem>
          <SelectItem value="crane">Crane</SelectItem>
          <SelectItem value="bulldozer">Bulldozer</SelectItem>
          <SelectItem value="mixer">Concrete Mixer</SelectItem>
          <SelectItem value="generator">Generator</SelectItem>
          <SelectItem value="tools">Hand Tools</SelectItem>
        </SelectContent>
      </Select>

      {/* Ownership Filter */}
      <Select value={filters.ownership} onValueChange={(value) => updateFilter("ownership", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Ownership" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-ownership">All</SelectItem>
          <SelectItem value="owned">Owned</SelectItem>
          <SelectItem value="rented">Rented</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
