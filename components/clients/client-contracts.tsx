import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Calendar } from "lucide-react"

const contracts = [
  {
    id: "CON-001",
    client: "Société Immobilière El Djazair",
    project: "Villa Hydra",
    value: 1200000,
    startDate: "2023-10-01",
    endDate: "2024-03-31",
    status: "active",
    progress: 75,
    paymentTerms: "Monthly",
    nextPayment: "2024-01-25",
  },
  {
    id: "CON-002",
    client: "COSIDER Construction",
    project: "Apartment Complex Bab Ezzouar",
    value: 2800000,
    startDate: "2023-08-15",
    endDate: "2024-06-15",
    status: "active",
    progress: 60,
    paymentTerms: "Milestone-based",
    nextPayment: "2024-02-01",
  },
  {
    id: "CON-003",
    client: "Private Client - Karim Messaoudi",
    project: "Residential Villa",
    value: 850000,
    startDate: "2023-12-01",
    endDate: "2024-05-31",
    status: "active",
    progress: 40,
    paymentTerms: "Bi-weekly",
    nextPayment: "2024-01-30",
  },
  {
    id: "CON-004",
    client: "ENPI",
    project: "Office Building Cheraga",
    value: 1800000,
    startDate: "2023-09-01",
    endDate: "2024-04-30",
    status: "active",
    progress: 80,
    paymentTerms: "Monthly",
    nextPayment: "2024-01-28",
  },
  {
    id: "CON-005",
    client: "Private Client - Amina Boudjemaa",
    project: "Residential Complex Douera",
    value: 3200000,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    status: "completed",
    progress: 100,
    paymentTerms: "Milestone-based",
    nextPayment: "N/A",
  },
]

export function ClientContracts() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "pending":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Client Contracts</CardTitle>
            <CardDescription>Manage all project contracts and agreements</CardDescription>
          </div>
          <Button className="bg-construction-primary hover:bg-construction-primary/90">
            <FileText className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.id}</TableCell>
                <TableCell>{contract.client}</TableCell>
                <TableCell>{contract.project}</TableCell>
                <TableCell>{contract.value.toLocaleString()} DA</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(contract.startDate).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">to {new Date(contract.endDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-construction-primary h-2 rounded-full"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{contract.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(contract.status)}>{contract.status}</Badge>
                </TableCell>
                <TableCell>
                  {contract.nextPayment !== "N/A" ? (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(contract.nextPayment).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
