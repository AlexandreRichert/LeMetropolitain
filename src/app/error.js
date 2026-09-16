'use client'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function Error({ error, reset }) {
  return (
    <Container className='flex min-h-[60svh] flex-col justify-center py-24'>
      <p className='cartel text-stone'>Incident technique</p>
      <h1 className='mt-6 text-title'>Une salle est momentanément inaccessible</h1>
      <p className='mt-6 max-w-md text-lead text-ink-2'>La collection n'a pas pu être chargée. {error?.message}</p>
      <div className='mt-10'>
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </Container>
  )
}
