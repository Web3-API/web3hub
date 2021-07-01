let buttons: Record<string, any> = {}

const buttonBase = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '14px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '-0.6px',
  textTransform: 'uppercase',
  borderRadius: '4px',
  bg: 'transparent',
  border: '2px solid transparent',
  color: 'text',
}

const buttonPaddingSizes = {
  small: {
    px: '2rem',
    py: '0.75rem'
  },
  medium: {
    px: '3rem',
    py: '1rem'
  },
  large: {
    px: '4rem',
    py: '1.25rem'
  },
}

const buttonColorStates = {
  primary: {
    bg: 'w3ButtonTeal',
    borderColor: 'w3ButtonTeal',
    color: 'white',
    boxShadow: '0px 15px 30px rgba(20, 102, 204, 0.16)',
    '&:hover': {
      bg: 'w3TextNavTeal',
      borderColor: 'w3TextNavTeal',
    },
    '&:active': {
      bg: '#255661',
      borderColor: '#255661',
    },
    '&[disabled]': {
      bg: 'w3TextNavTeal',
      borderColor: 'w3TextNavTeal',
      cursor: 'not-allowed'
    }
  },
  secondary: {
    borderColor: 'text',
    color: 'text',
    '&:hover': {
      bg: 'rgba(104, 129, 132, 0.1)',
    },
    '&:active': {
      bg: 'rgba(104, 129, 132, 0.2)',
    },
    '&[disabled]': {
      cursor: 'not-allowed'
    }
  },
  hollow: {
    boxShadow: 'none',
    color: 'white',
  },
  callout: {
    color: 'white',
    background: 'linear-gradient(0deg, #529DAD 1.85%, #60C092 97.11%)',
  },
}

Object.keys(buttonColorStates).map((name) => {
  Object.keys(buttonPaddingSizes).map((size) => {
    buttons[name+(size.charAt(0).toUpperCase() + size.slice(1))] = {
      ...buttonBase,
      ...buttonColorStates[name as keyof typeof buttonColorStates],
      ...buttonPaddingSizes[size as keyof typeof buttonPaddingSizes]
    }
  })
})

export default buttons
