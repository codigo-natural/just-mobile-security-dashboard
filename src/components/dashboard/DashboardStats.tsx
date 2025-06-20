import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface DashboardStatsProps {
  totalServices: number
  completedServices: number
  inProgressServices: number
  totalVulnerabilities: number
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalServices,
  completedServices,
  inProgressServices,
  totalVulnerabilities,
}) => (
  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Total Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{totalServices}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{completedServices}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>In Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{inProgressServices}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          Total Vulnerabilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{totalVulnerabilities}</div>
      </CardContent>
    </Card>
  </div>
)
