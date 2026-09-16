import Container from '@/components/ui/Container'

export default function Loading() {
  return (
    <Container className='py-24'>
      <div className='h-4 w-40 animate-pulse bg-paper-2' />
      <div className='mt-8 h-16 w-2/3 animate-pulse bg-paper-2' />
      <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='aspect-[4/5] animate-pulse bg-paper-2' />
        ))}
      </div>
    </Container>
  )
}
