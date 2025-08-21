"use client"

import { useState } from "react"
import { EquipmentCard } from "./equipment-card"
import { EquipmentDetailModal } from "./equipment-detail-modal"

// Mock equipment data
const mockEquipment = [
  {
    id: "1",
    name: "CAT 320D Excavator",
    type: "excavator",
    model: "320D",
    brand: "Caterpillar",
    status: "in-use",
    ownership: "owned",
    project: "Luxury Villa Complex",
    location: "Algiers Construction Site",
    purchaseDate: "2022-03-15",
    purchasePrice: 2500000,
    currentValue: 2100000,
    lastMaintenance: "2024-11-15",
    nextMaintenance: "2025-02-15",
    hoursUsed: 1250,
    fuelConsumption: "25L/hour",
    operator: "Karim Zidane",
    rentalCost: 0,
    maintenanceCosts: [
      { date: "2024-11-15", description: "Oil change and filter replacement", cost: 15000 },
      { date: "2024-08-20", description: "Hydraulic system repair", cost: 45000 },
    ],
  },
  {
    id: "2",
    name: "Liebherr LTM 1050 Crane",
    type: "crane",
    model: "LTM 1050",
    brand: "Liebherr",
    status: "available",
    ownership: "rented",
    project: null,
    location: "Equipment Yard",
    rentalStart: "2024-12-01",
    rentalEnd: "2025-03-01",
    rentalCost: 180000,
    dailyRate: 6000,
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-01-01",
    hoursUsed: 320,
    maxCapacity: "50 tons",
    operator: null,
    maintenanceCosts: [{ date: "2024-12-01", description: "Pre-rental inspection", cost: 8000 }],
  },
  {
    id: "3",
    name: "Komatsu D65PX Bulldozer",
    type: "bulldozer",
    model: "D65PX",
    brand: "Komatsu",
    status: "maintenance",
    ownership: "owned",
    project: "Highway Bridge Repair",
    location: "Maintenance Workshop",
    purchaseDate: "2021-08-10",
    purchasePrice: 1800000,
    currentValue: 1400000,
    lastMaintenance: "2024-12-10",
    nextMaintenance: "2024-12-20",
    hoursUsed: 2100,
    fuelConsumption: "18L/hour",
    operator: "Youcef Brahimi",
    rentalCost: 0,
    maintenanceCosts: [
      { date: "2024-12-10", description: "Engine overhaul", cost: 85000 },
      { date: "2024-09-05", description: "Track replacement", cost: 120000 },
    ],
  },
  {
    id: "4",
    name: "SCHWING Concrete Mixer",
    type: "mixer",
    model: "S 36 X",
    brand: "SCHWING",
    status: "in-use",
    ownership: "owned",
    project: "Office Building Downtown",
    location: "Oran Construction Site",
    purchaseDate: "2023-01-20",
    purchasePrice: 850000,
    currentValue: 750000,
    lastMaintenance: "2024-10-30",
    nextMaintenance: "2025-01-30",
    hoursUsed: 680,
    capacity: "8 cubic meters",
    operator: "Mehdi Larbi",
    rentalCost: 0,
    maintenanceCosts: [{ date: "2024-10-30", description: "Drum cleaning and calibration", cost: 12000 }],
  },
  {
    id: "5",
    name: "Atlas Copco Generator",
    type: "generator",
    model: "QAS 60",
    brand: "Atlas Copco",
    status: "available",
    ownership: "rented",
    project: null,
    location: "Equipment Yard",
    rentalStart: "2024-11-15",
    rentalEnd: "2025-02-15",
    rentalCost: 45000,
    dailyRate: 500,
    lastMaintenance: "2024-11-15",
    nextMaintenance: "2025-01-15",
    hoursUsed: 150,
    powerOutput: "60 kVA",
    operator: null,
    maintenanceCosts: [],
  },
  {
    id: "6",
    name: "Professional Tool Set",
    type: "tools",
    model: "Complete Set",
    brand: "Various",
    status: "in-use",
    ownership: "owned",
    project: "Shopping Mall Renovation",
    location: "Annaba Construction Site",
    purchaseDate: "2023-06-01",
    purchasePrice: 125000,
    currentValue: 100000,
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-02-01",
    quantity: 50,
    operator: "Multiple Workers",
    rentalCost: 0,
    maintenanceCosts: [{ date: "2024-11-01", description: "Tool inspection and replacement", cost: 8500 }],
  },
]

interface EquipmentGridProps {
  filters: {
    search: string
    status: string
    type: string
    ownership: string
  }
}

export function EquipmentGrid({ filters }: EquipmentGridProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)

  // Filter equipment based on filters
  const filteredEquipment = mockEquipment.filter((equipment) => {
    if (filters.search && !equipment.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.status && filters.status !== "all-status" && equipment.status !== filters.status) return false
    if (filters.type && filters.type !== "all-types" && equipment.type !== filters.type) return false
    if (filters.ownership && filters.ownership !== "all-ownership" && equipment.ownership !== filters.ownership)
      return false

    return true
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} onClick={() => setSelectedEquipment(equipment)} />
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No equipment found matching your criteria.</p>
        </div>
      )}

      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          isOpen={!!selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </>
  )
}
