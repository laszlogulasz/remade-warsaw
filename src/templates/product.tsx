import { defaultComponents, FormiumForm } from '@formium/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import SwiperCore, {
  Controller,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import tw from 'twin.macro'
import {
  FormControl,
  Header,
  Radio,
  Textarea,
  TextInput,
} from '../components/formElements'
import Layout from '../components/Layout'
import formium from '../lib/formium'
SwiperCore.use([Navigation, Pagination, Controller, Thumbs])

const ProductWrapper = tw.main`my-4 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 gap-4 grid grid-cols-1 sm:grid-cols-6`
const GalleryWrapper = tw.figure`max-w-full col-start-1 col-end-7 lg:(col-start-1 col-end-5)`
const Gallery = tw(
  Swiper,
)`max-w-lg sm:max-w-screen-sm lg:max-w-full mb-1 shadow`
const ThumbsGallery = tw(Swiper)`max-w-lg sm:max-w-screen-sm lg:max-w-full`
const ProductlDetailsWrapper = tw.section`col-start-1 col-end-7 w-full max-w-screen-sm lg:(col-start-5 col-end-7 place-self-start) place-self-center`
const ProductTitle = tw.h2`mb-5 font-fancy text-4xl text-primaryDark uppercase`
const ProductDescription = tw.div`text-primaryDark font-light w-full sm:(max-w-screen-sm place-self-center) col-start-1 col-end-7 lg:(text-lg col-start-1 col-end-5 place-self-start)`
const ProductDetails = tw.div`col-start-1 col-end-7 w-full max-w-screen-sm lg:(col-start-1 col-end-5) grid justify-items-start`
const ProductDetailsHeader = tw.h3`mb-3 font-fancy text-xl text-primaryDark uppercase`
const ProductDetailsList = tw.ul``
const ProductFormWrapper = tw.section`col-start-1 col-end-7 lg:(col-start-5 col-end-7 place-self-start w-full) max-w-screen-sm place-self-center`
const ProductDetail = tw.li`text-primaryDark lg:text-lg font-light`
const SpanBold = tw.span`pl-1 font-normal`

const myComponents = {
  ...defaultComponents,
  TextInput,
  FormControl,
  Header,
  Textarea,
  Radio,
}

const Product = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
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
  const formiumFormData = data.formiumForm
  console.log(
    '🚀 ~ file: product.tsx ~ line 64 ~ Product ~ formiumFormData',
    formiumFormData,
  )
  const thumbs = data.airtable.data.Images.localFiles.map(
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
    <Layout title={`Remade Warsaw | ${data.airtable.data.Name}`}>
      <ProductWrapper>
        <GalleryWrapper>
          <Gallery
            spaceBetween={50}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            id="gallery"
          >
            {images}
          </Gallery>
          <ThumbsGallery
            onSwiper={setThumbsSwiper}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            id="thumbs"
            spaceBetween={5}
            slidesPerView={6}
            className="productThumbs"
          >
            {thumbs}
          </ThumbsGallery>
        </GalleryWrapper>
        <ProductlDetailsWrapper>
          <ProductTitle>{data.airtable.data.Name}</ProductTitle>

          <ProductDetailsHeader>Product details</ProductDetailsHeader>
          <ProductDetailsList>
            <ProductDetail>
              Dimentions (WxLxH):
              <SpanBold>{data.airtable.data.Size__WxLxH_}</SpanBold>
            </ProductDetail>
            <ProductDetail>
              Designer:
              <SpanBold>{data.airtable.data.Designer[0].data.Name}</SpanBold>
            </ProductDetail>
            <ProductDetail>
              Producer:
              <SpanBold>
                {data.airtable.data.Vendor
                  ? data.airtable.data.Vendor
                  : 'unknown'}
              </SpanBold>
            </ProductDetail>
          </ProductDetailsList>
        </ProductlDetailsWrapper>
        <ProductDescription>
          <ReactMarkdown>{data.airtable.data.Description}</ReactMarkdown>
        </ProductDescription>

        <ProductFormWrapper>
          <FormiumForm
            data={formiumFormData}
            components={myComponents}
            onSubmit={async values => {
              await formium.submitForm('buy-a-product', {
                ...values,
                title: data.airtable.data.Name,
              })
              alert('Success')
            }}
          />
        </ProductFormWrapper>
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
        Vendor
      }
    }
    formiumForm(id: { eq: "60e1cc150304f100014fee16" }) {
      id
      schema
    }
    allFormiumForm {
      edges {
        node {
          id
          name
          slug
          projectId
          schema
          createAt
          updateAt
        }
      }
    }
  }
`

export default Product
