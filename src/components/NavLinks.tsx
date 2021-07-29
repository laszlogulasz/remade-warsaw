import React from 'react'
import tw from 'twin.macro'

interface INavigation {
  name: string
  href: string
  current: boolean
}
const navigation: INavigation[] = [
  { name: 'Sklep', href: '#', current: true },
  { name: 'O nas', href: '#', current: false },
  { name: 'Sprzedane', href: '#', current: false },
  { name: 'Kontakt', href: '#', current: false },
  { name: 'EN', href: '#', current: false },
]

const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const navLinks = navigation.map(item => (
    <a
      key={item.name}
      href={item.href}
      css={[
        item.current
          ? tw`text-secondaryDark`
          : tw`text-primaryDark hover:text-deepDark`,
        tw`px-3 py-2 rounded-md text-base sm:text-lg lg:text-xl font-normal active:(ring-0 ring-offset-0)`,
        mobile && tw`block`,
      ]}
      aria-current={item.current ? 'page' : undefined}
      onClick={e => e.currentTarget.blur()}
    >
      {item.name}
    </a>
  ))
  return <>{navLinks}</>
}

export default NavLinks
