import { Service } from '@/lib/types'
import { getServices } from '@/lib/sdk'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'

export default async function DashboardPage() {
  const services: Service[] = await getServices()
  const totalServices = services.length
  const completedServices = services.filter(
    (s) => s.status === 'COMPLETED'
  ).length
  const inProgressServices = services.filter(
    (s) => s.status === 'IN PROGRESS'
  ).length

  const totalVulnerabilities = services.reduce((sum, service) => {
    return (
      sum +
      (service.severityCount
        ? (service.severityCount.high || 0) +
          (service.severityCount.medium || 0) +
          (service.severityCount.low || 0) +
          (service.severityCount.info || 0)
        : 0)
    )
  }, 0)

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <DashboardStats
        totalServices={totalServices}
        completedServices={completedServices}
        inProgressServices={inProgressServices}
        totalVulnerabilities={totalVulnerabilities}
      />
      <DashboardCharts services={services} />
    </div>
  )
}
