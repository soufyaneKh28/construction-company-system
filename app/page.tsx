import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { WeatherWidget } from "@/components/weather-widget"
import { CalendarWidget } from "@/components/calendar-widget"
import { QuickActions } from "@/components/quick-actions"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          {/* KPI Section */}
          <section>
            <h2 className="text-2xl font-bold font-serif text-foreground mb-4">Key Performance Indicators</h2>
            <KPICards />
          </section>

          {/* Widgets Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherWidget />
            <CalendarWidget />
          </div>

          {/* Actions and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions />
            <NotificationsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
