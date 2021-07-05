import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import SwiperCore, {
  Controller,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import tw from 'twin.macro'
import Layout from '../components/Layout'
SwiperCore.use([Navigation, Pagination, Controller, Thumbs])

const ProductWrapper = tw.main`my-4 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2`
const Gallery = tw(Swiper)`max-w-lg`

const Product = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [controlledSwiper, setControlledSwiper] = useState(null)
  const images = data.airtable.data.Images.localFiles.map(
    (image: any, i: number) => {
      const img = getImage(image)
      return (
        <SwiperSlide key={i}>
          <GatsbyImage alt={data.airtable.data.Name} image={img} />
        </SwiperSlide>
      )
    },
  )
  return (
    <Layout>
      <ProductWrapper>
        <Gallery
          spaceBetween={50}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {images}
        </Gallery>
        <Gallery
          watchSlidesVisibility
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          id="thumbs"
          spaceBetween={5}
          slidesPerView={5}
        >
          {images}
        </Gallery>
      </ProductWrapper>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    airtable(data: { Slug: { eq: $slug } }) {
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
        Description
        Size__WxLxH_
      }
    }
  }
`

export default Product
