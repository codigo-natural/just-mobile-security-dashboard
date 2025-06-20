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
  const appName = service.scans[0]?.app?.name || service.summary?.name || 'N/A'
  const appIcon =
    service.scans[0]?.app?.icon?.url ||
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
              {service.scans[0]?.app?.description ||
                service.summary?.description}
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
          {service.services.name}
        </div>
        <div>
          <span className='font-semibold'>Company:</span>{' '}
          {service.assessment.company.name}
        </div>
        <div>
          <span className='font-semibold'>Start Date:</span>{' '}
          {format(parseISO(service.start_at), 'PPP p')}
        </div>
        <div>
          <span className='font-semibold'>End Date:</span>{' '}
          {format(parseISO(service.end_at), 'PPP p')}
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
