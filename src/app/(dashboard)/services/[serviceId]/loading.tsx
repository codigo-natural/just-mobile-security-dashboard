import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='space-y-8'>
      {/* Card principal */}
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Skeleton className='w-16 h-16 rounded-lg' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='grid md:grid-cols-2 gap-4 text-sm mt-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-4 w-32' />
          ))}
        </CardContent>
      </Card>

      {/* Filtros y título de vulnerabilidades */}
      <section>
        <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
          <Skeleton className='h-8 w-56' />
          <div className='flex gap-2 w-full md:w-auto'>
            <Skeleton className='h-9 w-48' />
            <Skeleton className='h-9 w-44' />
          </div>
        </div>
        {/* Tarjetas de vulnerabilidad en skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-6 w-16 rounded' />
                </div>
                <Skeleton className='mt-2 h-4 w-48' />
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-2 text-xs'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </CardContent>
              <div className='flex items-center px-6 pb-4'>
                <Skeleton className='h-9 w-full' />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
