import React from 'react'
import tw from 'twin.macro'
import GlobalStyles from '../styles/GlobalStyles'
import Footer from './Footer'
import SEO from './SEO'
import TopBar from './TopBar'
interface LayoutProps {
  children: React.ReactNode
  title: string
}

const Header = tw.header`shadow bg-secondaryLight w-screen`

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <>
    <GlobalStyles />
    <SEO title={title} />
    <Header>
      <TopBar />
    </Header>
    {children}
    <Footer />
  </>
)

export default Layout
