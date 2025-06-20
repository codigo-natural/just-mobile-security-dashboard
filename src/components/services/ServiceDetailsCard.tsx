import { Service } from '@/lib/types'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card'
import { ImageWithFallback } from '../ui/ImageWithFallback'
import { format, parseISO } from 'date-fns'

interface Props {
  service: Service
}

export function ServiceDetailsCard({ service }: Props) {
  const firstScan =
    Array.isArray(service.scans) && service.scans.length > 0
      ? service.scans[0]
      : undefined
  const appName = firstScan?.app?.name || service.summary?.name || 'N/A'
  const appIcon =
    firstScan?.app?.icon?.url ||
    service.summary?.icon ||
    '/placeholder-icon.png'
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center space-x-4'>
          <ImageWithFallback
            src={appIcon}
            alt={`${appName} icon`}
            width={64}
            height={64}
            className='rounded-lg'
          />
          <div>
            <CardTitle className='text-2xl'>{appName}</CardTitle>
            <CardDescription>
              {firstScan?.app?.description || service.summary?.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid md:grid-cols-2 gap-4 text-sm'>
        <div>
          <span className='font-semibold'>Platform:</span> {service.platform}
        </div>
        <div>
          <span className='font-semibold'>Status:</span> {service.status}
        </div>
        <div>
          <span className='font-semibold'>Service Type:</span>{' '}
          {service.services?.name || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Company:</span>{' '}
          {service.assessment?.company?.name || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Start Date:</span>{' '}
          {service.start_at
            ? format(parseISO(service.start_at), 'PPP p')
            : 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>End Date:</span>{' '}
          {service.end_at ? format(parseISO(service.end_at), 'PPP p') : 'N/A'}
        </div>
        {service.summary && (
          <>
            <div>
              <span className='font-semibold'>Scan Status:</span>{' '}
              {service.summary.status}
            </div>
            <div>
              <span className='font-semibold'>Scan Duration:</span>{' '}
              {service.summary.duration.human}
            </div>
            <div>
              <span className='font-semibold'>App Version:</span>{' '}
              {service.summary.version || 'N/A'}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
