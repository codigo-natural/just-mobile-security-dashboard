import { Service } from '@/lib/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ServiceStatusChart } from '@/components/dashboard/charts/ServiceStatusChart'
import { VulnerabilitySeverityChart } from '@/components/dashboard/charts/VulnerabilitySeverityChart'
import React from 'react'

interface DashboardChartsProps {
  services: Service[]
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  services,
}) => (
  <div className='grid gap-6 md:grid-cols-2'>
    <Card>
      <CardHeader>
        <CardTitle>Services by Status</CardTitle>
        <CardDescription>
          Distribution of services based on their current status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServiceStatusChart services={services} />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Vulnerabilities by Severity</CardTitle>
        <CardDescription>
          Overall distribution of vulnerabilities by severity across all
          completed services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VulnerabilitySeverityChart services={services} />
      </CardContent>
    </Card>
  </div>
)
