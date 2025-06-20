import Link from 'next/link'
import { Service } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '../custom/Button'
import { ImageWithFallback } from '../ui/ImageWithFallback'

interface Props {
  service: Service
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
      return 'bg-green-500 hover:bg-green-600'
    case 'IN PROGRESS':
      return 'bg-yellow-500 hover:bg-yellow-600'
    case 'WAITING_DATA':
      return 'bg-blue-500 hover:bg-blue-600'
    default:
      return 'bg-gray-500 hover:bg-gray-600'
  }
}

export const ServiceCard = ({ service }: Props) => {
  const appName = service.scans[0]?.app?.name || service.summary?.name || 'N/A'
  const appDescription =
    service.scans[0]?.app?.description ||
    service.summary?.description ||
    'No description'
  const appIcon =
    service.scans[0]?.app?.icon?.url ||
    service.summary?.icon ||
    '/placeholder-icon.png'

  return (
    <Card className='flex flex-col @container'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <ImageWithFallback
            src={appIcon}
            alt={`${appName} icon`}
            width={48}
            height={48}
            className='rounded-lg mr-4'
          />
          <div className='flex-1 @[400px]:flex @[400px]:items-center @[400px]:justify-between'>
            <div>
              <CardTitle className='text-xl'>{appName}</CardTitle>
              <CardDescription>{appDescription}</CardDescription>
            </div>
            <Badge
              className={`${getStatusColor(service.status)} @[400px]:ml-4`}
            >
              {service.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p>
          <span className='font-semibold'>Platform:</span> {service.platform}
        </p>
        <p>
          <span className='font-semibold'>Service Type:</span>{' '}
          {service.services.name}
        </p>
        <p>
          <span className='font-semibold'>Company:</span>{' '}
          {service.assessment.company.name}
        </p>
        <p>
          <span className='font-semibold'>Started:</span>{' '}
          {format(new Date(service.start_at), 'MMM dd, yyyy')}
        </p>
        {service.summary?.status === 'Completed' &&
          service.summary?.finishedAt && (
            <p>
              <span className='font-semibold'>Finished:</span>{' '}
              {format(
                new Date(service.summary.finishedAt),
                'MMM dd, yyyy HH:mm'
              )}
            </p>
          )}
      </CardContent>
      <CardFooter>
        <Link href={`/services/${service.id}`} className='w-full'>
          <Button variant='outline' className='w-full cursor-pointer'>
            View Details <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
