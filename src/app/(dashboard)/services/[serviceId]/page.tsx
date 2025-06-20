import { getServiceById } from '@/lib/sdk'
import { Service } from '@/lib/types'
import { ServiceDetailsCard } from '@/components/services/ServiceDetailsCard'
import { VulnerabilitiesSection } from '@/components/vulnerabilities/VulnerabilitiesSection'
import { notFound } from 'next/navigation'

interface Props {
  params: { serviceId: string }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceId } = params
  const serviceIdNumber = parseInt(serviceId, 10)
  if (isNaN(serviceIdNumber) || serviceIdNumber <= 0) {
    notFound()
  }

  let service: Service | null = null
  let error: string | null = null
  try {
    service = await getServiceById(serviceIdNumber)
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
