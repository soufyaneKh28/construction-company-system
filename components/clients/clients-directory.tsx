"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Phone, Mail, MapPin, Building, User } from "lucide-react"
import { useState } from "react"

const clients = [
  {
    id: "CLI-001",
    name: "Société Immobilière El Djazair",
    type: "Corporate",
    contact: "Ahmed Benali",
    phone: "+213 21 123 456",
    email: "contact@sid-dz.com",
    address: "Rue Didouche Mourad, Alger Centre",
    projectsCount: 3,
    totalValue: 4500000,
    status: "active",
    lastContact: "2024-01-15",
    satisfaction: 4.5,
  },
  {
    id: "CLI-002",
    name: "COSIDER Construction",
    type: "Corporate",
    contact: "Fatima Zerrouki",
    phone: "+213 21 789 012",
    email: "projects@cosider.dz",
    address: "Zone Industrielle, Rouiba",
    projectsCount: 2,
    totalValue: 6800000,
    status: "active",
    lastContact: "2024-01-12",
    satisfaction: 4.8,
  },
  {
    id: "CLI-003",
    name: "Private Client - Karim Messaoudi",
    type: "Individual",
    contact: "Karim Messaoudi",
    phone: "+213 555 234 567",
    email: "k.messaoudi@email.com",
    address: "Hydra, Alger",
    projectsCount: 1,
    totalValue: 1200000,
    status: "active",
    lastContact: "2024-01-10",
    satisfaction: 4.2,
  },
  {
    id: "CLI-004",
    name: "Entreprise Nationale de Promotion Immobilière",
    type: "Government",
    contact: "Youcef Brahimi",
    phone: "+213 21 345 678",
    email: "finance@enpi.dz",
    address: "Ben Aknoun, Alger",
    projectsCount: 4,
    totalValue: 8900000,
    status: "active",
    lastContact: "2024-01-08",
    satisfaction: 4.6,
  },
  {
    id: "CLI-005",
    name: "Private Client - Amina Boudjemaa",
    type: "Individual",
    contact: "Amina Boudjemaa",
    phone: "+213 555 345 678",
    email: "a.boudjemaa@email.com",
    address: "Douera, Alger",
    projectsCount: 1,
    totalValue: 850000,
    status: "completed",
    lastContact: "2023-12-20",
    satisfaction: 4.9,
  },
]

export function ClientsDirectory() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.contact.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || client.type.toLowerCase() === typeFilter
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getClientIcon = (type: string) => {
    switch (type) {
      case "Corporate":
        return Building
      case "Government":
        return Building
      case "Individual":
        return User
      default:
        return User
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Directory</CardTitle>
              <CardDescription>Manage all client information and relationships</CardDescription>
            </div>
            <Button className="bg-construction-primary hover:bg-construction-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Client Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => {
              const ClientIcon = getClientIcon(client.type)
              return (
                <Card key={client.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            <ClientIcon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sm">{client.name}</h3>
                          <p className="text-xs text-muted-foreground">{client.contact}</p>
                        </div>
                      </div>
                      <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{client.address}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Projects</p>
                          <p className="font-semibold">{client.projectsCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Value</p>
                          <p className="font-semibold">{(client.totalValue / 1000000).toFixed(1)}M DA</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-muted-foreground text-xs">
                          Last Contact: {new Date(client.lastContact).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-muted-foreground">Satisfaction:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${i < Math.floor(client.satisfaction) ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({client.satisfaction})</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
