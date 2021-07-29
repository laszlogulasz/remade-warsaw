import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: transparent;
    ${tw`antialiased bg-secondaryLight`}
    
  }
  * {
    ${tw`focus:(outline-none ring-2 ring-offset-2 ring-primaryDark)`}
  }
  .productThumbs .swiper-slide {
  opacity: 0.4;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
margin-bottom: 10px;
}

.productThumbs .swiper-slide-thumb-active {
  opacity: 1;
/* box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); */
}

input[type="radio"] + label span {
    transition: background .2s,
      transform .2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span{
  transform: scale(1.2);
} 

input[type="radio"]:checked + label span {
  box-shadow: 0px 0px 0px 2px white inset;
  ${tw`bg-primaryDark`}
}
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
