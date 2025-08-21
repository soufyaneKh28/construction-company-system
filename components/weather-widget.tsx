import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react"

const weatherData = [
  { day: "Today", temp: "28°C", condition: "Sunny", icon: Sun, humidity: "45%" },
  { day: "Tomorrow", temp: "26°C", condition: "Partly Cloudy", icon: Cloud, humidity: "52%" },
  { day: "Wed", temp: "24°C", condition: "Rainy", icon: CloudRain, humidity: "78%" },
  { day: "Thu", temp: "27°C", condition: "Sunny", icon: Sun, humidity: "41%" },
  { day: "Fri", temp: "29°C", condition: "Sunny", icon: Sun, humidity: "38%" },
]

export function WeatherWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5 text-primary" />
          <span className="font-serif">Weather Forecast - Algiers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Sun className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-lg">28°C</p>
                <p className="text-sm text-muted-foreground">Sunny</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Wind className="h-4 w-4" />
                <span>12 km/h</span>
              </div>
              <p className="text-sm text-muted-foreground">Humidity: 45%</p>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="grid grid-cols-5 gap-2">
            {weatherData.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg hover:bg-muted transition-colors">
                <p className="text-xs font-medium text-muted-foreground mb-1">{day.day}</p>
                <day.icon className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-sm font-semibold">{day.temp}</p>
                <p className="text-xs text-muted-foreground">{day.humidity}</p>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center mt-4">
            Weather conditions affect outdoor construction work. Plan accordingly.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
