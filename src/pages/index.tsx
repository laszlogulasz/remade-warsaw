import { graphql } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'
import Card from '../components/Card'
import Layout from '../components/Layout'

const CardsWrapper = tw.main`my-4 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

const IndexPage = ({ data }) => {
  const cards = data?.allAirtable?.edges.map(
    (element: { node: any }, i: React.Key) => {
      const {
        node: { data },
      } = element
      return <Card key={'card' + i} data={data} />
    },
  )

  return (
    <Layout>
      <CardsWrapper>{cards}</CardsWrapper>
    </Layout>
  )
}
export const query = graphql`
  query Exmple {
    allAirtable(
      filter: { table: { eq: "Furniture" } }
      sort: { fields: rowIndex }
    ) {
      edges {
        node {
          data {
            Images {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            Name
            Designer {
              data {
                Name
              }
            }
          }
        }
      }
    }
  }
`
export default IndexPage
