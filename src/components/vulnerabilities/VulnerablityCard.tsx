import Link from 'next/link'
import { Vulnerability } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { SeverityBadge } from './SeverityBadge'
import { ArrowRight, ListChecks, ShieldAlert } from 'lucide-react'
import { Button } from '../custom/Button'

interface Props {
  vulnerability: Vulnerability
  serviceId: number
  language?: 'en' | 'es'
}

export const VulnerabilityCard = ({
  vulnerability,
  serviceId,
  language = 'en',
}: Props) => {
  const translation =
    vulnerability.translations.find((t) => t.language === language) ||
    vulnerability.translations.find((t) => t.language === 'en') || // Fallback
    vulnerability.translations[0] // fallback

  const stripHtmlAndTruncate = (html: string, length: number = 100) => {
    const text = html.replace(/<[^>]*>?/gm, '')
    return text.length > length ? text.substring(0, length) + '...' : text
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-lg'>{vulnerability.title}</CardTitle>
          <SeverityBadge severity={vulnerability.severity} />
        </div>
        {translation && (
          <CardDescription className='mt-2 text-sm text-muted-foreground'>
            {stripHtmlAndTruncate(translation.description, 150)}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-2 text-xs'>
          <div className='flex items-center'>
            <ShieldAlert className='w-4 h-4 mr-1 text-red-500' />
            OWASP MASVS: {vulnerability.owaspRef.masvs}
          </div>
          <div className='flex items-center'>
            <ListChecks className='w-4 h-4 mr-1 text-blue-500' />
            OWASP MASWE: {vulnerability.owaspRef.maswe}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/services/${serviceId}/vulnerabilities/${vulnerability.vulnerabilityId}`}
          className='w-full'
        >
          <Button variant='outline' className='w-full'>
            View Vulnerability <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
