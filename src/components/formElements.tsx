import { FormControlProps } from '@formium/react'
import { RadioProps } from '@formium/react/dist/inputs'
import React, { ReactElement } from 'react'
import tw from 'twin.macro'

interface IFooterWrapper {
  children: React.ReactNode
  submitError: boolean
  submitSuccess: boolean
}
const inputStyles = tw`
p-1 
bg-white 
text-deepDark 
w-full 
max-w-screen-sm 
rounded 
overflow-hidden 
border 
placeholder-opacity-5 
focus:ring-primaryDark
`
export const Header = React.memo(function Header({ page }: any) {
  return (
    <h3 css={[tw`mb-3 font-fancy text-xl text-primaryDark uppercase`]}>
      {page.title}
    </h3>
  )
})

export const TextInput = (props: any) => {
  return (
    <input
      {...props}
      css={[
        inputStyles,
        props.error
          ? tw`border-red-500 ring-red-500 focus:ring-red-500`
          : tw`border-secondaryDark ring-secondaryDark
        `,
      ]}
    />
  )
}
export const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <label
      css={[
        tw`text-primaryDark font-light 
      `,
      ]}
    >
      <input
        type="radio"
        {...props}
        css={[
          tw`mb-1 form-radio rounded-full text-primaryDark focus:ring-primaryDark`,
        ]}
      />
      <span css={[tw`px-2`]}>{label}</span>
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
          ? tw`border-red-500 ring-red-500  focus:ring-red-500`
          : tw`border-secondaryDark ring-secondaryDark
        `,
      ]}
    />
  )
})

export const SubmitButton = (props: any) => {
  return (
    <button
      css={[
        tw`rounded py-1 px-4 font-light font-fancy text-xl text-primaryLight bg-primaryDark shadow-md active:(ring-0 bg-deepDark) hover:shadow focus:outline-none`,
      ]}
      onClick={e => e.currentTarget.blur()}
      type="submit"
    >
      SEND
    </button>
  )
}
export const FooterWrapper: React.FC<IFooterWrapper> = React.memo(
  function FooterWrapper(props) {
    return (
      <>
        {props.submitSuccess ? `Mamy to!` : props.children}
        {props.submitError && (
          <p css={[tw`text-red-500 mb-3 font-light text-sm`]}>
            Unable to submit form, please try again
          </p>
        )}
      </>
    )
  },
)

export const FormControl: React.FC<FormControlProps> = React.memo(
  function FormControl({
    children,
    description,
    error,
    label,
    labelFor,
    required,
  }) {
    return (
      <div css={[tw`mb-5`]}>
        {label && (
          <label css={[tw`block text-primaryDark text-lg`]} htmlFor={labelFor}>
            {`${label} ${required && '*'}`}
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
      </div>
    )
  },
)
