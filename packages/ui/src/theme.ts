import buttonVariants from './theme/buttons'

export const timing = [.25,.5,.75,1,1.25,1.5,1.75,2,3]

const GlobalTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Montserrat", sans-serif',
    monospace: '"Roboto Mono", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  colors: {
    background: '#EEE',
    text: '#688184',

    w3green: '#509DAC',
    w3darkGreen: '#0D373C',
    w3beige: '#688184',
    w3darkGray: '#141A1E',

    w3shade0: '#12191E',
    w3shade1: '#13212C',
    w3shade2: '#1B2731',
    w3shade3: '#1F3A46',

    w3greenGradient: 'linear-gradient(0deg, #529DAD 1.85%, #60C092 97.11%)',
    w3hazeGradient: 'linear-gradient(180deg, #FFFFFF 0%, #E1ECEA 100%)',

    w3ButtonTeal: '#335E67',
    w3TextNavTeal: '#4A7A84',

    w3NavHighlightTeal: '#243843',
    w3NavNeonHighlightTeal: '#66E0D9',
    w3NavGrayGreen: '#1B262C',

    w3PlayGroundNavy: '#13212C',
    w3PlaygroundSoftBlue: '#B2D2D9',

    w3OffWhite: '#E9E9E9',

    unknownHEX0: '#CAD9F3',
    unknownHEX1: '#EFF5F4',
    unknownHEX2: '#DDDDDD',
    unknownHEX3: '#597980',
    unknownHEX4: '#598188',
    unknownHEX5: '#86909F',
    unknownHEX6: '#FCFDFD',
    unknownHEX7: '#ECF4F2',

    unknownRGBA0: 'rgba(28, 94, 93, 0.1)',
    unknownRGBA1: 'rgba(104,129,132,.1)',
    unknownRGBA2: 'rgba(0,0,0,.4)',
    unknownRGBA3: 'rgba(0, 0, 0, 0.06)',
    unknownRGBA4: 'rgba(104,129,132,.5)',
    unknownRGBA5: 'rgba(20, 102, 204, 0.16)',
  },
  forms: {
    select: {
      bg: 'transparent',
      border: '2px solid rgba(205, 208, 227, 0.295455)',
      cursor: 'pointer',
      borderRadius: '8px',
      dark: {
        border: '2px solid',
        color: 'white',
        borderColor: 'rgba(202,217,243, .3)',
      },
    },
    input: {
      border: '2px solid rgba(205, 208, 227, 0.295455)',
    },
  },
  buttons: {
    ...buttonVariants
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
    },
    img: {
      maxWidth: '100%',
    },
  },
}

export default GlobalTheme