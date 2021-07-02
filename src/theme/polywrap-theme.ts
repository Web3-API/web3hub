// import { faPalette } from '@fortawesome/free-solid-svg-icons';
// import { colors } from '@material-ui/core';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { hexToCSSFilter, HexToCssConfiguration } from 'hex-to-css-filter/dist/es2015';
 
// const config: HexToCssConfiguration = {
//   acceptanceLossPercentage: 1,
//   maxChecks: 10,
// };

// const getFilter = (hexColor: string) => hexToCSSFilter(hexColor, config).filter

// **
// * Polywrap Color Palletes can be handled here, and declared as a palette object with needed configurations.
// *
// * Primary Green Gradient:    74DD9F - 27C69F - 120 Degrees
// * Secondary Blue Gradient :  1B5FED - 1B87ED - 179 Degrees
// * Terciary Yellow Gradient : FFC272 - FFE272 - 0 Degrees
// * Wrap Gradient :            878787 - FFFFFF - 127 Degrees - 0.35 Transparency 
// * Black Background :         231F20
// * White Background :         FFFFFF
// ** 

export const polywrapPalette = {
  primary: {
    gradient: 'linear-gradient(to right, #74DD9F 20%, #000000, 20%)',
    start: "#74DD9F",
    mid: "#4ED29F",
    end: "#27C69F",
    direction: '120deg',
  },
  secondary: {
    start: "#1B5FED",
    mid: "#1B6DED",
    end: "#1B87ED",
    direction: 179,
  },
  tertiary: {
    gradient: 'linear-gradient(to right, #FFC272, #FFE272)',
    start: "#FFC272",
    end: "#FFE272",
    direction: 0,
  },
  wrapGradient: {
    gradient: 'linear-gradient(0deg, #000000 35%, #FFFFFF 35%)',
    start: "#878787",
    end: "#FFFFFF",
    direction: 0,
    opacity: 0.35,
  },
  blackBackground: "#000000",
  whiteBackground: "#FFFFFF",
}


// export const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // sets background color
//       main: polywrapPalette.blackBackground, 
//     },
//     secondary: {
//       main: polywrapPalette.primary.start,
//     },
//     text: {
//       primary: polywrapPalette.primary.mid,   
//       secondary: polywrapPalette.whiteBackground
    
//     }
//   },
//   typography: {
//     fontFamily: `'Montserrat', sans-serif`,
//     h1: {
//       fontSize: 45,
//       letterSpacing: -1
//     },
//     h2: {
//       fontSize: 40,
//       letterSpacing: -1
//     },
//     h3: {
//       fontSize: 40,
//       lineHeight: 1.5,
//       letterSpacing: '-1px'
//     },
//     subtitle1: {
//       fontSize: 22,
//       lineHeight: 1.75
//     },
//     body1: {
//       fontSize: 14
//     }
//   },
//   overrides: {
//     MuiTextField: {
//       root: {
//         border: polywrapPalette.wrapGradient.gradient,
//         borderRadius: 4, 
//         backgroundColor: polywrapPalette.primary.end,
//         '& .MuiInput-underline:before': {
//           borderBottomColor: 'none',
//         },
//         '& .MuiInput-underline:hover:before': {
//           borderBottomColor: 'none',
//         },
//         '& .MuiInput-underline:after': {
//           borderBottomColor: 'none',
//         },
//         '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
//           borderBottom: '0'
//         }
//       },
//     },
//     MuiInput: {
//       root: {
//         height: 50,
//         //font color
//         color: polywrapPalette.terciary.start,
//         //bg color
//         backgroundColor: "#333333", 
//         //borders
//         border: 'solid 1px ' + polywrapPalette.wrapGradient.start,
//         borderColor: polywrapPalette.primary.end,
//         borderRadius: 4,
        
//         "& $notchedOutline": {
//           borderWidth: 0
//         },
//         "&:hover $notchedOutline": {
//           borderWidth: 0
//         },
//         "&$focused $notchedOutline": {
//           borderWidth: 2
//         }
//       },
//     },
//     MuiLink: {
//       root: {
//         '&:hover': {
//           color: polywrapPalette.primary.start
//         }
//       }
//     },
//     MuiAppBar: {
//       root: {
//         backgroundColor: polywrapPalette.blackBackground,
//         boxShadow: 'none'
//       }
//     },
//     MuiButton: {
//       outlinedSecondary: {
//         border: 'solid 1px ' + polywrapPalette.wrapGradient.start,
//         color: polywrapPalette.terciary.end,
//         '&:hover': {
//           border: 'solid 1px ' + polywrapPalette.wrapGradient.start,
//           backgroundColor: polywrapPalette.primary.end,
//           color: polywrapPalette.whiteBackground
//         }
//       }
//     }
//   }
// });


// export const filters = {
//   // sets color of Launch Partners when idle 
//   textSecondary: getFilter(polywrapPalette.wrapGradient.start),

//   // sets color for Launch Partners on-hover
//   secondary: getFilter(polywrapPalette.terciary.start) 
// };