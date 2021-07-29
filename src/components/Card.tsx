import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'
const CardAnchor = tw.a`rounded active:(ring-0 ring-offset-0)`
const CardWrapper = tw.figure`
max-w-md rounded overflow-hidden shadow hover:shadow-xl m-3 active:(shadow-sm)`
const Image = tw(GatsbyImage)`w-full aspect-w-3 aspect-h-2`
const CardCaption = tw.figcaption`flex-col p-2 text-center text-primaryDark`
const H3 = tw.h3`text-lg`
const P = tw.p`text-base`

const Card = (props: { data: any }) => {
  const { data } = props
  const image = getImage(data.Images.localFiles[0])
  return (
    <CardAnchor href={`/${data.Slug}`} onClick={e => e.currentTarget.blur()}>
      <CardWrapper>
        <Image alt={data.Name} image={image} />
        <CardCaption>
          <H3>{data.Name}</H3>
          <P>by {data.Designer && data.Designer[0].data.Name}</P>
        </CardCaption>
      </CardWrapper>
    </CardAnchor>
  )
}

export default Card
