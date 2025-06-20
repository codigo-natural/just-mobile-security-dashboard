import { Badge } from '../ui/badge'
import { Vulnerability } from '@/lib/types'

interface Props {
  severity: Vulnerability['severity']
}

const severityColors: Record<Vulnerability['severity'], string> = {
  high: 'bg-red-500 hover:bg-red-600',
  medium: 'bg-yellow-500 hover:bg-yellow-600',
  low: 'bg-blue-500 hover:bg-blue-600',
  info: 'bg-gray-500 hover:bg-gray-600',
}

export const SeverityBadge = ({ severity }: Props) => {
  return (
    <Badge className={`${severityColors[severity]} text-white capitalize`}>
      {severity}
    </Badge>
  )
}
