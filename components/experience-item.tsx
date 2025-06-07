import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export function ExperienceItem({ title, company, period, description, technologies }: ExperienceItemProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{company}</p>
          </div>
          <p className="text-sm font-medium bg-muted px-3 py-1 rounded-full w-fit">
            {period.includes("Present") ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {period}
              </span>
            ) : (
              period
            )}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
