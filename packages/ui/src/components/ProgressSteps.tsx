/** @jsxImportSource theme-ui **/

type ProgressStepsProps = {
  steps: string[]
  currentStep?: number
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  let animationSteps = [0, 0, 33.33, 66.66, 100]
  let target =
    currentStep === 1
      ? animationSteps[1]
      : currentStep === 2
      ? animationSteps[2]
      : currentStep === 3
      ? animationSteps[3]
      : currentStep === 4
      ? animationSteps[4]
      : animationSteps[0]
  return (
    <div
      className="steps-container"
      sx={{
        m: 'auto',
        '.step-wizard': {
          '*': {
            cursor: 'default',
          },
          '.progress-bar-native': {
            position: 'absolute',
            top: '50%',
            width: '77.5%',
            left: '11.25%',
            height: '8px',
            appearance: 'none',
            borderRadius: '4px',
            '&::-webkit-progress-bar': {
              bg: 'w3PlaygroundSoftBlue',
              borderRadius: '4px',
            },
            '&::-webkit-progress-value': {
              bg: 'w3green',
              borderRadius: '4px',
            },
          },
          ul: {
            p: 0,
            display: 'flex',
            li: {
              width: '25%',
              '.step-box': {
                display: 'grid',
                placeItems: 'center',
                background: 'none',
                border: 'none',
                color: '#777',
                '.step': {
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  lineHeight: '24px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: '3px solid',
                  borderColor: '#d0d0d0',
                  background: '#ffffff',
                  transition: 'background-color 0.6s ease, border-color 0.6s ease',
                },
                '.title': {
                  paddingTop: '10px',
                  color: '#767676',
                  transition: 'color 0.6s ease',
                },
                '&:hover': {
                  '.step': {
                    borderColor: '#3b5343',
                    background: '#eee',
                    color: '#3b5343',
                  },
                  '.title': {
                    color: '#3b5343',
                  },
                },
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
              '&.done': {
                '.title': {
                  color: '#3b5343',
                  '&:hover': {
                    color: '#3B5343',
                  },
                  '.step': {
                    color: 'white',
                    bg: '#3B5343',
                    borderColor: '#3B5343',
                  },
                },
              },
            },
          },
        },
      }}
    >
      <div className="step-wizard" role="navigation">
        <progress className="progress-bar-native" value={target} max="100" />
        <ul>
          {steps.map((step, idx) => {
            return (
              <li
                className={currentStep === idx + 1 ? 'active' : ''}
                key={'step-' + step}
              >
                <div className="step-box">
                  <div className="step">{idx + 1}</div>
                  <div className="title">{step}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ProgressSteps
