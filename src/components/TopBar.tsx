import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import tw from 'twin.macro'
import { theme } from '../../tailwind.config'
import Logo from './Logo'
import NavLinks from './NavLinks'

const NavBarWrapper = tw.div`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`
const NavBarElements = tw.div`relative flex items-center justify-between h-16`
const HamburgerWrapper = tw.div`absolute inset-y-0 left-0 flex items-center sm:hidden`
const HamburgerButton = tw(Disclosure.Button)`
  inline-flex
  items-center
  justify-center
  p-2 rounded-md
  text-gray-400 
  `
const NavElements = tw.div`
flex-1
flex 
items-center 
justify-center 
text-center
sm:items-stretch 
sm:justify-between 
`
const NavLinksWrapper = tw.div`space-x-4 hidden sm:block  self-center`
const SocialWrapper = tw.div`
absolute 
inset-y-0 
right-0 flex 
items-center 
pr-2 sm:static 
sm:inset-auto 
sm:ml-6 sm:pr-0
`
const SocialButton = tw.button`
bg-secondaryLight
p-1 rounded-full 
text-primaryDark
hover:text-white 
focus:outline-none 
focus:ring-2 
focus:ring-offset-2 
focus:ring-offset-gray-800 
focus:ring-white
`
const NavLinksWrapperMobile = tw(Disclosure.Panel)`sm:hidden`
const TopBar = () => {
  const color = theme.extend.colors.primaryDark
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <NavBarWrapper>
            <NavBarElements>
              <HamburgerWrapper>
                <HamburgerButton>
                  <span tw="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon tw="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon tw="block h-6 w-6" aria-hidden="true" />
                  )}
                </HamburgerButton>
              </HamburgerWrapper>
              <NavElements>
                <Logo />
                <NavLinksWrapper>
                  <NavLinks />
                </NavLinksWrapper>
              </NavElements>
              <SocialWrapper>
                <SocialButton>
                  <span tw="sr-only">View notifications</span>
                  <svg
                    tw="h-6 w-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <title>Logo Instagram</title>
                    <path
                      d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"
                      fill={color}
                    />
                    <path
                      d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"
                      fill={color}
                    />
                  </svg>
                </SocialButton>
              </SocialWrapper>
            </NavBarElements>
          </NavBarWrapper>
          <NavLinksWrapperMobile>
            <NavLinks mobile />
          </NavLinksWrapperMobile>
        </>
      )}
    </Disclosure>
  )
}

export default TopBar
