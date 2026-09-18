import CartSidebar from '@/components/billeterie/CartSidebar'
import OptionRow from '@/components/billeterie/OptionRow'
import TicketRow from '@/components/billeterie/TicketRow'
import Reveal from '@/components/motion/Reveal'
import Section from '@/components/ui/Section'
import { OPTIONS, TICKETS } from '@/lib/constants'

export const metadata = {
  title: 'Billetterie',
  description: 'Réservez vos billets pour Le Métropolitain : tarifs, options et visite guidée.',
  alternates: { canonical: '/billeterie' },
}

export default function BilleteriePage() {
  return (
    <Section title='Réservez votre visite' intro='Choisissez vos billets et vos options' className='pt-24'>
      <div className='grid gap-12 lg:grid-cols-[1fr_22rem]'>
        <div>
          <Reveal as='div'>
            {TICKETS.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </Reveal>

          <p className='cartel mb-6 mt-12 text-stone'>Options</p>
          <Reveal as='div' className='grid gap-4 sm:grid-cols-2'>
            {OPTIONS.map((option) => (
              <OptionRow key={option.id} option={option} />
            ))}
          </Reveal>
        </div>

        <CartSidebar />
      </div>
    </Section>
  )
}
