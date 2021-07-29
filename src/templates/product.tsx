import { defaultComponents, FormiumForm } from '@formium/react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'
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
  FooterWrapper,
  FormControl,
  Header,
  Radio,
  SubmitButton,
  Textarea,
  TextInput,
} from '../components/formElements'
import Layout from '../components/Layout'
import formium from '../lib/formium'
SwiperCore.use([Navigation, Pagination, Controller, Thumbs])

const ProductWrapper = tw.main`my-4 max-w-7xl mx-auto px-2 sm:px-6 gap-4 grid grid-cols-1 sm:grid-cols-12`
const GalleryWrapper = tw.figure`max-w-full col-start-1 col-end-13 lg:(col-start-1 col-end-9)`
const Gallery = tw(
  Swiper,
)`max-w-lg sm:max-w-screen-sm lg:max-w-full mb-1 shadow`
const ThumbsGallery = tw(Swiper)`max-w-lg sm:max-w-screen-sm lg:max-w-full`
const ProductlDetailsWrapper = tw.section`col-start-1 col-end-13 w-full max-w-screen-sm lg:(col-start-9 col-end-13 place-self-start) place-self-center`
const ProductTitle = tw.h2`mb-5 font-fancy text-4xl text-primaryDark uppercase`
const ProductDescription = tw.div`
  text-primaryDark 
  font-light 
  w-full 
  sm:(max-w-screen-sm place-self-center) 
  col-start-1 col-end-13 
  lg:(text-lg col-start-1 col-end-8 place-self-start)
`
const ProductDetailsHeader = tw.h3`mb-3 font-fancy text-xl text-primaryDark uppercase`
const ProductDetailsList = tw.ul``
const ProductFormWrapper = tw.section`col-start-1 col-end-13 w-full lg:(col-start-8 col-end-13 place-self-start)  max-w-screen-sm place-self-center`
const ProductDetail = tw.li`text-primaryDark lg:text-lg font-light`
const SpanBold = tw.span`pl-1 font-normal`

const Product = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  let containerRef = useRef(null)

  useEffect(() => {
    containerRef.current.firstChild.setAttribute('novalidate', true)
  }, [])

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

          <ProductDetailsHeader>Product details </ProductDetailsHeader>
          <ProductDetailsList>
            <ProductDetail>
              Dimentions (WxLxH):
              <SpanBold>{data.airtable.data.Size__WxLxH_}</SpanBold>
            </ProductDetail>
            <ProductDetail>
              Designer:
              <SpanBold>
                {data.airtable.data.Designer
                  ? data.airtable.data.Designer[0].data.Name
                  : `-`}
              </SpanBold>
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
        <ProductFormWrapper ref={containerRef}>
          <FormiumForm
            data={data.formiumForm}
            components={{
              ...defaultComponents,
              TextInput,
              FormControl,
              Header,
              Textarea,
              Radio,
              SubmitButton,
              FooterWrapper: (props: any) => (
                <FooterWrapper
                  {...props}
                  submitSuccess={submitSuccess}
                  submitError={submitError}
                />
              ),
            }}
            onSubmit={async values => {
              try {
                await formium.submitForm('buy-a-product', {
                  ...values,
                  title: data.airtable.data.Name,
                })
                containerRef.current.firstChild.reset()
                setSubmitSuccess(true)
                setTimeout(() => setSubmitSuccess(false), 5000)
              } catch (error) {
                setSubmitError(true)
                setTimeout(() => setSubmitError(false), 5000)
              }
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
