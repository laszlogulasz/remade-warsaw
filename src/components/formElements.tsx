import { FormControlProps } from '@formium/react'
import { RadioProps } from '@formium/react/dist/inputs'
import React, { ReactElement } from 'react'
import tw from 'twin.macro'
const inputStyles = tw`
p-1 
mb-3 
bg-white 
text-deepDark 
w-full 
max-w-screen-sm 
rounded 
overflow-hidden 
border 
placeholder-opacity-5 
focus:(outline-none ring-1)
`
export const Header = React.memo(function Header({ page }: any) {
  return (
    <h3 css={[tw`mb-3 font-fancy text-xl text-primaryDark uppercase`]}>
      {page.title}
    </h3>
  )
})

export const TextInput = function TextInput(props: any) {
  return (
    <input
      {...props}
      css={[
        inputStyles,
        props.error
          ? tw`border-red-500 ring-red-500`
          : tw`border-secondaryDark ring-secondaryDark
        `,
      ]}
    />
  )
}
export function Radio({ label, ...props }: RadioProps) {
  return (
    <label
      css={[
        tw`text-primaryDark pl-2
      `,
      ]}
    >
      <input type="radio" {...props} />
      {label}
    </label>
  )
}

export const Textarea = React.memo(function TextInput(props: any) {
  return (
    <textarea
      rows={5}
      {...props}
      css={[
        inputStyles,
        props.error
          ? tw`border-red-500 ring-red-500`
          : tw`border-secondaryDark ring-secondaryDark
        `,
      ]}
    />
  )
})

export const FormControl: React.FC<FormControlProps> = React.memo(
  function FormControl({ children, description, error, label, labelFor }) {
    return (
      <>
        {label && (
          <label
            css={[tw`block text-primaryDark font-light text-lg`]}
            htmlFor={labelFor}
          >
            {label}
          </label>
        )}
        {description && (
          <p css={[tw`block text-secondaryDark font-light text-sm`]}>
            {description}
          </p>
        )}
        {React.cloneElement(children as ReactElement, { error })}
        {error && (
          <p css={[tw`text-red-500 mb-3 font-light text-sm`]}>{error}</p>
        )}
      </>
    )
  },
)
