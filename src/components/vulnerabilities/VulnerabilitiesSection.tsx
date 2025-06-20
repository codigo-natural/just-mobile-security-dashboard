'use client'

import { Service } from '@/lib/types'
import { Input } from '../custom/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { VulnerabilityCard } from './VulnerablityCard'
import { useState, useMemo } from 'react'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { X } from 'lucide-react'

interface Props {
  service: Service
}

export function VulnerabilitiesSection({ service }: Props) {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  console.log('services: ', service)

  // Usar debounce para el término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm('')
  }

  // Memoizar las vulnerabilidades filtradas para mejor rendimiento
  const filteredVulnerabilities = useMemo(() => {
    if (!service.vulnerabilities) return []

    return service.vulnerabilities.filter((vuln) => {
      // Filtro por severidad
      const severityMatch =
        selectedSeverity === 'all' || vuln.severity === selectedSeverity

      // Filtro por término de búsqueda
      const searchTermMatch =
        debouncedSearchTerm.trim() === '' ||
        (() => {
          const searchLower = debouncedSearchTerm.toLowerCase().trim()

          // Buscar en el título
          if (vuln.title.toLowerCase().includes(searchLower)) {
            return true
          }

          // Buscar en las traducciones (descripción, remediación, impacto)
          if (
            vuln.translations.some((t) => {
              const description = t.description.toLowerCase()
              const remediation = t.remediation.toLowerCase()
              const impact = t.impact.toLowerCase()
              return (
                description.includes(searchLower) ||
                remediation.includes(searchLower) ||
                impact.includes(searchLower)
              )
            })
          ) {
            return true
          }

          // Buscar en las referencias
          if (
            vuln.refs.some(
              (ref) =>
                ref.label.toLowerCase().includes(searchLower) ||
                ref.url.toLowerCase().includes(searchLower)
            )
          ) {
            return true
          }

          // Buscar en las referencias OWASP
          if (
            vuln.owaspRef.masvs.toLowerCase().includes(searchLower) ||
            vuln.owaspRef.maswe.toLowerCase().includes(searchLower)
          ) {
            return true
          }

          // Buscar en las evidencias (archivos y líneas de código)
          if (
            vuln.evidences.some(
              (evidence) =>
                evidence.file_path.toLowerCase().includes(searchLower) ||
                evidence.value.toLowerCase().includes(searchLower)
            )
          ) {
            return true
          }

          return false
        })()

      return severityMatch && searchTermMatch
    })
  }, [service.vulnerabilities, selectedSeverity, debouncedSearchTerm])

  const severities = useMemo(() => {
    if (!service.vulnerabilities) return []
    return Array.from(
      new Set(service.vulnerabilities.map((v) => v.severity))
    ).sort()
  }, [service.vulnerabilities])

  if (!service.summary) {
    return (
      <p className='text-center text-muted-foreground py-8'>
        Service analysis not yet completed. No summary or vulnerabilities
        available.
      </p>
    )
  }

  if (!service.vulnerabilities || service.vulnerabilities.length === 0) {
    return (
      <p className='text-center text-muted-foreground py-8'>
        No vulnerabilities found for this service.
      </p>
    )
  }

  return (
    <section>
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
        <h2 className='text-2xl font-semibold'>
          Vulnerabilities ({filteredVulnerabilities.length})
          {searchTerm !== debouncedSearchTerm && searchTerm.trim() !== '' && (
            <span className='text-sm text-muted-foreground ml-2'>
              Searching...
            </span>
          )}
        </h2>
        <div className='flex gap-2 w-full md:w-auto'>
          <div className='relative'>
            <Input
              placeholder='Search vulnerabilities by title, description, files...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='max-w-sm pr-8'
            />
            {searchTerm !== debouncedSearchTerm && searchTerm.trim() !== '' && (
              <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
              </div>
            )}
            {searchTerm.trim() !== '' && (
              <button
                onClick={clearSearch}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors'
                title='Clear search'
              >
                <X className='h-4 w-4 text-gray-400 hover:text-gray-600' />
              </button>
            )}
          </div>
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by severity' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Severities</SelectItem>
              {severities.map((sev) => (
                <SelectItem key={sev} value={sev} className='capitalize'>
                  {sev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredVulnerabilities.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredVulnerabilities.map((vuln) => (
            <VulnerabilityCard
              key={vuln.vulnerabilityId}
              vulnerability={vuln}
              serviceId={service.id}
            />
          ))}
        </div>
      ) : (
        <p className='text-center text-muted-foreground'>
          {debouncedSearchTerm.trim() !== '' || selectedSeverity !== 'all'
            ? 'No vulnerabilities match your criteria.'
            : 'No vulnerabilities found for this service.'}
        </p>
      )}
    </section>
  )
}
