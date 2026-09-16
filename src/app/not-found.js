import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export const metadata = { title: 'Page introuvable' }

export default function NotFound() {
  return (
    <Container className='flex min-h-[60svh] flex-col justify-center py-24'>
      <p className='cartel text-stone'>Erreur 404</p>
      <h1 className='mt-6 text-title'>Cette salle est fermée</h1>
      <p className='mt-6 max-w-md text-lead text-ink-2'>
        La page ou l'œuvre demandée n'existe pas ou n'est plus exposée.
      </p>
      <div className='mt-10 flex gap-3'>
        <Button href='/'>Retour à l'accueil</Button>
        <Button href='/oeuvres' variant='outline'>
          Voir la collection
        </Button>
      </div>
    </Container>
  )
}
