import React from 'react'
import tw from 'twin.macro'
import GlobalStyles from '../styles/GlobalStyles'
import Footer from './Footer'
import TopBar from './TopBar'
const Header = tw.header`shadow bg-secondaryLight w-screen`
const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Header>
      <TopBar />
    </Header>
    {children}
    <Footer />
  </>
)

export default Layout
