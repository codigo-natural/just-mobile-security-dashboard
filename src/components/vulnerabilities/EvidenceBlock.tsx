import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Evidence } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../custom/Button'

interface Props {
  evidence: Evidence
  index: number
}

export const EvidenceBlock = ({ evidence, index }: Props) => {
  const evidenceAnchorId = `evidence-${evidence.id}`

  const handleCopyEvidenceLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${evidenceAnchorId}`
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('Evidence link copied!'))
      .catch(() => toast.error('Could not copy link'))
  }

  return (
    <Card id={evidenceAnchorId} className='mb-4'>
      <CardHeader>
        <nav className='flex justify-between items-center'>
          <CardTitle className='text-md'>Evidence {index + 1}</CardTitle>
          <Button
            className='cursor-pointer'
            variant='outline'
            title='Copy direct link to this evidence'
            onClick={handleCopyEvidenceLink}
          >
            <Copy className='mr-2 h-4 w-4' /> Copy evidence
          </Button>
        </nav>
        {evidence.file_path && (
          <CardDescription>
            Path: {evidence.file_path}
            {evidence.file_line &&
              evidence.file_line.length > 0 &&
              `
          (line: ${evidence.file_line.join(', ')})`}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {evidence.vulnerability_evidence_types_id === 1 && evidence.value ? ( // 1 Bloque para codigo
          <SyntaxHighlighter
            language={evidence.extra || 'plaintext'}
            style={materialDark}
            showLineNumbers
            wrapLines
            customStyle={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            {evidence.value}
          </SyntaxHighlighter>
        ) : (
          <p>
            {evidence.value || 'Evidence data not available or not code block.'}
          </p>
        )}
        {/* Aca podriamos manejar otros tipos de evidencia */}
      </CardContent>
    </Card>
  )
}
