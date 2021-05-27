/** @jsxImportSource theme-ui **/
import RDS from 'react-dropdown-select'

type RDSProps = {
  dark?: boolean
  skinny?: boolean
  labelField: string
  placeholder: string
  valueField: string
  options: any[]
  values?: any[]
  onChange: (values: any) => void
}

const SelectBox = ({
  dark,
  skinny,
  labelField,
  placeholder,
  valueField,
  options,
  values = [],
  onChange,
}: RDSProps) => {
  return (
    <RDS
      sx={{
        width: '17.5rem !important',
        border: ' 0.125rem solid !important',
        borderColor: 'w3beige !important',
        color: 'text',
        bg: dark ? 'w3shade1 !important' : 'white !important',
        p: '1rem !important',
        borderRadius: '0.5rem !important',
        height: skinny ? '2.625rem' : '3.875rem !important',
        '&[aria-expanded="true"]': {
          borderBottomLeftRadius: '0 !important',
          borderBottomRightRadius: '0 !important',
          borderBottom: 'none !important',
          pt: 'calc(1rem - 0.125rem) !important',
          '*': {
            color: dark ? 'white !important' : 'text',
          },
        },
        '.react-dropdown-select-no-data': {
          color: 'text',
        },
        '&:hover, &:focus-within': {
          borderColor: 'text',
          boxShadow: 'none !important',
        },
        // '.react-dropdown-select-input': {
        //   display: 'none',
        // },
        '.react-dropdown-select-clear': {
          fontSize: '1.5625rem !important',
          top: '-0.125rem !important',
          right: '-0.375rem !important',
        },
        '.react-dropdown-select-dropdown': {
          top: skinny ? '2.375rem' : '3 .625rem',
          bg: dark ? 'w3shade1' : 'white',
          color: dark ? 'white' : 'text',
          border: dark ? '0.125rem solid' : '0 .125rem solid',
          borderColor: dark ? 'w3beige' : 'w3beige',
          borderBottomLeftRadius: '0.5rem !important',
          borderBottomRightRadius: '0.5rem !important',
          borderTopLeftRadius: '0rem !important',
          borderTopRightRadius: '0rem !important',
          borderTop: '0.0625rem solid rgba(104,129,132,.5) !important',
          left: '-0.125rem !important',
          width: 'calc(100% + 0.25rem) !important',
        },
        '.react-dropdown-select-item': {
          borderColor: 'rgba(104,129,132,.5) !important',
          fontFamily: 'Montserrat !important',
          fontWeight: 'bold !important',
          fontSize: '0.875rem !important',
          lineHeight: '0.875rem !important',
          color: dark ? 'white !important' : 'text',
          padding: '1rem 2rem !important',
          height: skinny ? '2.25rem !important' : '3 !important.5rem',
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'left !important',
          pl: '1.25rem !important',
          '&.react-dropdown-select-item-selected': {
            bg: dark ? 'w3shade1 !important' : 'white !important',
            borderBottomColor: 'inherit !important',
          },
          '&:hover': {
            bg: dark ? 'w3shade3 !important' : '#cad9f3 !important',
          },
          '&:last-of-type': {
            borderBottom: 'none !important',
          },
          '&:first-of-type': {
            borderTop: 'none !important',
          },
        },
        '.react-dropdown-select-content': {
          span: {
            height: '1.5rem !important',
            display: 'flex !important',
            flexDirection: 'column',
            alignItems: 'center !important',
            justifyContent: 'center !important',
            fontFamily: 'Montserrat !important',

            fontWeight: 'bold !important',
            fontSize: '0.875rem !important',
            lineHeight: '0.875rem !important',
            letterSpacing: '-0.004em !important',

            color: dark ? 'white !important' : 'text',
          },
        },
        '.react-dropdown-select-dropdown-handle:focus path': {
          stroke: 'none !important',
        },
      }}
      keepSelectedInList
      placeholder={placeholder}
      dropdownHandle={true}
      labelField={labelField}
      valueField={valueField}
      options={options}
      values={values}
      onChange={onChange}
    />
  )
}

export default SelectBox
