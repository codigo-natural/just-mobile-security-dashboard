import { getServiceById } from '@/lib/data-loader'
import { Service } from '@/lib/types'
import { ServiceDetailsCard } from '@/components/services/ServiceDetailsCard'
import { VulnerabilitiesSection } from '@/components/vulnerabilities/VulnerabilitiesSection'
import { notFound } from 'next/navigation'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

interface Props {
  params: { serviceId: string }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceId } = await params
  const serviceIdNumber = parseInt(serviceId, 10)

  if (isNaN(serviceIdNumber) || serviceIdNumber <= 0) {
    notFound()
  }

  let service: Service | null = null
  let error: string | null = null
  try {
    const result = await getServiceById(serviceIdNumber)
    service = result ?? null
  } catch (err: unknown) {
    error =
      err instanceof Error ? err.message : 'Failed to load service details.'
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <div className='text-red-500 text-center mb-4'>{error}</div>
        <div className='text-sm text-gray-500'>
          Please check the service ID and try again.
        </div>
      </div>
    )
  }

  console.log('services ID page:', service)
  if (!service) {
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <div className='text-center mb-4'>Service not found.</div>
        <div className='text-sm text-gray-500'>
          The requested service could not be found.
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <ServiceDetailsCard service={service} />
      <VulnerabilitiesSection service={service} />
    </div>
  )
}
