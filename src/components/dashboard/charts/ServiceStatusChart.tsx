'use client'
import { Service } from '@/lib/types'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  services: Service[]
}

const COLORS = {
  COMPLETED: '#4CAF50',
  IN_PROGRESS: '#FFC107',
  WAITING_DATA: '#2196F3',
}

export const ServiceStatusChart = ({ services }: Props) => {
  const statusCounts = services.reduce((acc, service) => {
    acc[service.status] = (acc[service.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }))

  if (!services || services.length === 0)
    return <p>No service data for chart</p>
  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          nameKey='name'
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
