import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Services</h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Card className='flex flex-col' key={i}>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <Skeleton className='rounded-lg mr-4 h-12 w-12' />
                <div className='flex-1 flex flex-col gap-2'>
                  <CardTitle className='text-xl'>
                    <Skeleton className='h-5 w-32' />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className='h-4 w-40' />
                  </CardDescription>
                </div>
                <Skeleton className='h-6 w-20 rounded-full ml-4' />
              </div>
            </CardHeader>
            <CardContent className='flex-grow space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-36' />
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-4 w-32' />
            </CardContent>
            <CardFooter>
              <Skeleton className='h-10 w-full rounded' />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
