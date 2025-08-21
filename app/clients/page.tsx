import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientsDirectory } from "@/components/clients/clients-directory"
import { ClientContracts } from "@/components/clients/client-contracts"
import { CommunicationLogs } from "@/components/clients/communication-logs"
import { ClientSatisfaction } from "@/components/clients/client-satisfaction"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-construction-dark">Clients Management</h1>
        <p className="text-muted-foreground">Manage client relationships and project history</p>
      </div>

      <Tabs defaultValue="directory" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="directory">Client Directory</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <ClientsDirectory />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <ClientContracts />
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <CommunicationLogs />
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <ClientSatisfaction />
        </TabsContent>
      </Tabs>
    </div>
  )
}
