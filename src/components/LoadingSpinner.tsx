/** @jsxImportSource theme-ui **/

const LoadingSpinner = () => {
  return (
    <div
      className="lds-dual-ring"
      sx={{
        display: 'inline-block',
        width: '160px',
        height: '160px',
        '&:after': {
          content: '" "',
          display: 'block',
          width: '128px',
          height: '128px',
          margin: '8px',
          borderRadius: '50%',
          border: '12px solid #fff',
          borderColor: '#fff transparent #fff transparent',
          animation: 'lds-dual-ring 1.2s linear infinite',
        },
        '@keyframes lds-dual-ring': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      }}
    />
  )
}

export default LoadingSpinner
