import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, MessageCircle } from "lucide-react"

const satisfactionData = [
  {
    client: "Société Immobilière El Djazair",
    project: "Villa Hydra",
    rating: 4.5,
    feedback: "Excellent work quality and professional team. Very satisfied with the progress and communication.",
    date: "2024-01-15",
    category: "Overall Experience",
    aspects: {
      quality: 5,
      timeline: 4,
      communication: 4,
      value: 5,
    },
  },
  {
    client: "COSIDER Construction",
    project: "Apartment Complex Bab Ezzouar",
    rating: 4.8,
    feedback: "Outstanding project management and attention to detail. Highly recommend for future projects.",
    date: "2024-01-10",
    category: "Project Management",
    aspects: {
      quality: 5,
      timeline: 5,
      communication: 4,
      value: 5,
    },
  },
  {
    client: "Private Client - Karim Messaoudi",
    project: "Residential Villa",
    rating: 4.2,
    feedback: "Good work overall, but some delays in material delivery. Communication could be improved.",
    date: "2024-01-08",
    category: "Communication",
    aspects: {
      quality: 4,
      timeline: 3,
      communication: 4,
      value: 5,
    },
  },
  {
    client: "ENPI",
    project: "Office Building Cheraga",
    rating: 4.6,
    feedback: "Professional service and high-quality construction. Met all specifications and deadlines.",
    date: "2024-01-05",
    category: "Quality",
    aspects: {
      quality: 5,
      timeline: 5,
      communication: 4,
      value: 4,
    },
  },
  {
    client: "Private Client - Amina Boudjemaa",
    project: "Residential Complex Douera",
    rating: 4.9,
    feedback: "Exceptional service from start to finish. Exceeded expectations in every aspect.",
    date: "2023-12-20",
    category: "Overall Experience",
    aspects: {
      quality: 5,
      timeline: 5,
      communication: 5,
      value: 4,
    },
  },
]

const overallMetrics = {
  averageRating: 4.6,
  totalReviews: 47,
  satisfactionTrend: "+12%",
  categories: [
    { name: "Work Quality", score: 4.7, improvement: "+8%" },
    { name: "Timeline Adherence", score: 4.4, improvement: "+15%" },
    { name: "Communication", score: 4.3, improvement: "+10%" },
    { name: "Value for Money", score: 4.6, improvement: "+5%" },
  ],
}

export function ClientSatisfaction() {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallMetrics.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{overallMetrics.satisfactionTrend}</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallMetrics.totalReviews}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallMetrics.satisfactionTrend}</div>
            <p className="text-xs text-muted-foreground">Quarterly improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <Badge variant="default">Quality</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Work Quality rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Categories</CardTitle>
            <CardDescription>Performance across different aspects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overallMetrics.categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-600">{category.improvement}</span>
                      <span className="text-sm font-semibold">{category.score}</span>
                    </div>
                  </div>
                  <Progress value={(category.score / 5) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest client reviews and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfactionData.slice(0, 3).map((feedback) => (
                <div key={`${feedback.client}-${feedback.project}`} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{feedback.client}</h4>
                      <p className="text-xs text-muted-foreground">{feedback.project}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(feedback.rating)}
                      <span className="text-sm font-semibold ml-1">{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{feedback.feedback}</p>
                  <p className="text-xs text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Client Feedback</CardTitle>
          <CardDescription>Comprehensive satisfaction analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {satisfactionData.map((feedback) => (
              <div key={`${feedback.client}-${feedback.project}`} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{feedback.client}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(feedback.rating)}</div>
                    <span className="font-semibold">{feedback.rating}</span>
                    <Badge variant="outline">{feedback.category}</Badge>
                  </div>
                </div>

                <p className="text-sm mb-4">{feedback.feedback}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(feedback.aspects).map(([aspect, score]) => (
                    <div key={aspect} className="text-center">
                      <p className="text-xs text-muted-foreground capitalize">{aspect}</p>
                      <div className="flex justify-center mt-1">{renderStars(score)}</div>
                      <p className="text-xs font-semibold mt-1">{score}/5</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Reviewed on {new Date(feedback.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
