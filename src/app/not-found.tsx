import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/custom/Button'
import { Navbar } from '@/components/layout/Navbar'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex flex-1 items-center justify-center bg-background'>
        <Card className='max-w-md w-full text-center'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              404 - Página no encontrada
            </CardTitle>
            <CardDescription>
              Lo sentimos, la página que buscas no existe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className='mt-4'>
              <Link href='/'>Volver al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className='text-center p-4 border-t'>
        Ivan Camilo {new Date().getFullYear()} Just Movile Security
      </footer>
    </div>
  )
}
