import React from 'react'
import { Helmet } from 'react-helmet'

interface ISEO {
  title: string
}
const SEO: React.FC<ISEO> = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/ths8pfq.css"
        ></link>
        <meta name="description" content={'description'} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={'url'} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={'description'} />
        <meta property="og:image" content={'image'} />
        <meta property="fb:app_id" content={'fbAppID'} />
      </Helmet>
    </>
  )
}

export default SEO
