/** @jsxImportSource theme-ui **/

type ProgressStepsProps = {
  steps: string[]
  currentStep?: number
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div
      id="container"
      sx={{
        '#container': {
          position: 'relative',
          textAlign: 'center',
          maxWidth: '80%',
          boxSizing: 'border-box',
          margin: '0 auto',
        },
        '.buttons': {
          position: 'absolute',
          top: '180px',
          textAlign: 'center',
          width: '100%',
        },
        '.btn': {
          width: '50px',
          height: '30px',
        },
        '.step-wizard': {
          display: 'inline-block',
          position: 'relative',
          width: '85%',
          '.progress': {
            position: 'absolute',
            top: '35px',
            left: '12.5%',
            width: '75%',
          },
          '.progressbar': {
            position: 'absolute',
            backgroundColor: '#3B5343',
            opacity: '1',
            height: '3px',
            width: '0%',
            WebkitTransition: 'width 0.6s ease',
            OTransition: 'width 0.6s ease',
            transition: 'width 0.6s ease',
            '&.empty': {
              opacity: '1',
              width: '100%',
              backgroundColor: '#d0d0d0',
            },
          },
          ul: {
            position: 'absolute',
            width: '100%',
            listStyleType: 'none',
            padding: '0',
            left: '-2%',
          },
          li: {
            display: 'inline-block',
            textAlign: 'center',
            width: '24%',
            '& .step': {
              textAlign: 'center',
              display: 'inline-block',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: '30px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '3px solid',
              borderColor: '#d0d0d0',
              background: '#ffffff',
              WebkitTransition: 'background-color 0.6s ease, border-color 0.6s ease',
              OTransition: 'background-color 0.6s ease, border-color 0.6s ease',
              transition: 'background-color 0.6s ease, border-color 0.6s ease',
            },
            '& .title': {
              textDecoration: 'underline',
              width: '100%',
              paddingTop: '10px',
              color: '#767676',
              WebkitTransition: 'color 0.6s ease',
              OTransition: 'color 0.6s ease',
              transition: 'color 0.6s ease',
            },
            '&.active': {
              '.step': {
                borderColor: '#3B5343',
                color: '#3b5343',
              },
              '.title': {
                textDecoration: 'none',
                color: '#3b5343',
                fontWeight: 'bold',
              },
            },
            '&.done .title': {
              color: '#3b5343',
              '&:hover': {
                color: '#3B5343',
              },
            },
            '&.done .step': {
              color: 'white',
              backgroundColor: '#3B5343',
              borderColor: '#3B5343',
            },
            '& > button': {
              background: 'none',
              border: 'none',
              display: 'block',
              width: '100%',
              color: '#777',
              position: 'relative',
              textAlign: 'center',
              '&:hover': {
                '& .step': {
                  borderColor: '#3b5343',
                  background: '#eee',
                  color: '#3b5343',
                },
                '& .title': {
                  color: '#3b5343',
                },
              },
            },
          },
        },
        '@media only screen and (max-width: 1200px)': {
          '.step-wizard li': {
            width: '24%',
          },
        },
        '@media only screen and (max-width: 375px)': {
          '.step-wizard li': {
            width: '22%',
          },
        },
      }}
    >
      <div className="step-wizard" role="navigation">
        <div className="progress">
          <div className="progressbar empty"></div>
          <div id="prog" className="progressbar"></div>
        </div>
        <ul>
          {steps.map((step, idx) => {
            return (
              <li
                className={currentStep === idx + 1 && 'active'}
                key={'step-' + step}
              >
                <button>
                  <div className="step">{idx + 1}</div>
                  <div className="title">{step}</div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ProgressSteps
