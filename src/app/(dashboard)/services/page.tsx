import { getServices } from '@/lib/sdk'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Service } from '@/lib/types'

export default async function ServicesPage() {
  const services: Service[] = await getServices()

  if (!services || services.length === 0) {
    return <p>No sevices found.</p>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Services</h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
