/** @jsxImportSource theme-ui **/
import { useCallback, useEffect } from 'react'
import { Input, Flex, Button, Themed } from 'theme-ui'
import axios from 'axios'
import { useCreateSubdomain } from '../../hooks/ens/useCreateSubdomain'
import { useStateValue } from '../../state/state'
import getMetaDataFromPackageHash from '../../services/ipfs/getMetaDataFromPackageHash'
import { MAIN_DOMAIN, ZERO_ADDRESS } from '../../constants'
import { getOwner } from '../../services/ens/getOwner'
import Card from '../Card'
import Modal from '../Modal'

type ErrorMsg = {
  children: any
  bottomshift?: boolean
}

// error component
const ErrorMsg = ({ children, bottomshift }: ErrorMsg) => (
  <span
    sx={{
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '-0.4000000059604645px',
      textAlign: 'left',
      color: 'rgba(255, 0, 0, 0.5)',
      mt: 2,
      position: bottomshift ? 'relative' : 'absolute',
    }}
  >
    {children}
  </span>
)

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue()
  const [executeCreateSubdomain, { status }] = useCreateSubdomain()

  useEffect(() => {
    if (publish.subdomain !== '') {
      checkForENSAvailability(publish.subdomain)
    }
  }, [dapp.address])

  const checkForENSAvailability = useCallback(
    async (label: string) => {
      dispatch({ type: 'setsubdomainLoading', payload: true })
      try {
        const owner = await getOwner(`${label}.${MAIN_DOMAIN}`, dapp.web3)
        if (owner === ZERO_ADDRESS) {
          dispatch({ type: 'setsubdomainLookupSuccess', payload: true })
          dispatch({ type: 'setsubdomainError', payload: '' })
        } else {
          dispatch({ type: 'setsubdomainLookupSuccess', payload: false })
          dispatch({
            type: 'setsubdomainError',
            payload: 'Subdomain name is not available',
          })
        }
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'setsubdomainLoading', payload: false })
    },
    [dapp.web3],
  )

  const handleSubdomainChange = async (e) => {
    dispatch({ type: 'setsubdomain', payload: e.target.value })
    dispatch({ type: 'setsubdomainError', payload: '' })
    dispatch({ type: 'setsubdomainLookupSuccess', payload: false })
    if (e.target.value !== '') {
      checkForENSAvailability(e.target.value)
    }
  }

  const handleRegisterENS = async (e) => {
    e.preventDefault()
    if (dapp.address === undefined) {
      dispatch({ type: 'setShowConnectModal', payload: true })
    } else {
      executeCreateSubdomain(publish.subdomain, publish.ipfs)
    }
  }

  useEffect(() => {
    if (status === 3) {
      dispatch({ type: 'setsubdomainRegisterSuccess', payload: true })
    }
  }, [status])

  
  useEffect(() => {
    if(dapp.github === '') {
      dispatch({ type: 'setShowSignInModal', payload: true })  
    }
  }, [dapp.github])

  useEffect(() => {
    if (publish.subdomain !== '' && publish.ipfs !== '') {
      executeCreateSubdomain(publish.subdomain, publish.ipfs)
    }
  }, [dapp.address])

  const handleIPFSHashInput = async (e) => {
    dispatch({ type: 'setipfs', payload: e.target.value })
    dispatch({ type: 'setipfsLoading', payload: true })
    dispatch({ type: 'setipfsSuccess', payload: false })
    dispatch({ type: 'setipfsError', payload: '' })
    if (e.target.value !== '') {
      let metaData = await getMetaDataFromPackageHash(e.target.value)
      if (metaData === undefined) {
        dispatch({ type: 'setipfsLoading', payload: false })
        dispatch({ type: 'setApiData', payload: null })
        dispatch({ type: 'setipfsError', payload: 'No Package available' })
      } else {
        dispatch({ type: 'setipfsLoading', payload: false })
        dispatch({ type: 'setipfsSuccess', payload: true })
        dispatch({ type: 'setApiData', payload: metaData })
      }
    } else {
      dispatch({ type: 'setipfsLoading', payload: false })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (publish.apiData && publish.subdomain.length > 0) {
      if (dapp.github && dapp.github !== '') {
        const publishReq = await axios.post(
          'http://localhost:3001/apis/publish',
          {
            name: publish.apiData.name,
            description: publish.apiData.description,
            subtext: publish.apiData.subtext,
            icon: publish.apiData.icon,
            locationUri: 'ipfs/'+publish.ipfs,
            pointerUris: [`${publish.subdomain}.${MAIN_DOMAIN}`],
          },
          {
            headers: {
              Authorization: 'token ' + dapp.github,
            },
            withCredentials: true,
          },
        )
        dispatch({ type: 'setShowSuccessModal', payload: true })
      } else {
        dispatch({ type: 'setShowSignInModal', payload: true })
      }
    }
  }

  const handleInvalid = async (e) => {
    e.preventDefault()
    if (e.target.name === 'ipfs') {
      dispatch({ type: 'setipfsError', payload: 'Please enter a valid IPFS hash' })
    }
    if (e.target.name === 'ens') {
      dispatch({
        type: 'setsubdomainError',
        payload: 'Please enter a valid ENS sub-domain',
      })
    }
  }

  const ipfsClasses = publish.ipfsLoading
    ? 'loading'
    : publish.ipfsSuccess
    ? 'success'
    : publish.ipfsError
    ? 'error'
    : ''
  
  const available  = publish.subdomainLookupSuccess ? 'available' : ''  
  const registered = publish.subdomainRegisterSuccess ? 'registered' : ''
  const registering = publish.subdomainLoading ? 'loading' : ''
  const registrationError   = publish.subdomainError ? 'error' : ''

  const subdomainClasses = [available, registered, registering, registrationError].join(' ')

  return (
    <Flex className="publish">
      {publish.showConnectModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'connect'}
            noLeftShift
            close={() => {
              dispatch({ type: 'setShowConnectModal', payload: false })
            }}
          />
        </div>
      )}
      {publish.showSignInModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'signin'}
            noLeftShift
          />
        </div>
      )}
      {publish.showSuccessModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'success'}
            noLeftShift
            close={() => {
              dispatch({ type: 'setShowSuccessModal', payload: false })
            }}
            data={`${publish.subdomain}.${MAIN_DOMAIN}`}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        onInvalid={handleInvalid}
        sx={{
          flex: 7,
          section: {
            mb: '4.375rem',
          },
          h4: {
            color: 'w3darkGreen',
            mb: 2,
          },
          '.fieldset': {
            left: '-1px',
          },
          p: {
            fontFamily: 'Istok Web',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            color: 'text',
            my: 3,
            mb: 2,
          },
          '.labelEl': {
            width: '13.75rem',
            mr: '2.75rem',
            mb: 2,
            color: 'text',
            fontFamily: 'Montserrat',
            fontSize: '0.875rem',
            lineHeight: '1.375rem',
            letterSpacing: '-0.025rem',
            '+ *': { width: '30.25rem' },
          },
          input: {
            color: 'black',
            p: 3,
            pr: 5,
            borderRadius: '8px',
            fontFamily: 'Roboto Mono',
            fontSize: '16px',
            lineHeight: '140.62%',
          },
          '@keyframes rotate': {
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
          '.inputwrap': {
            '&:after': {
              display: 'block',
              position: 'absolute',
              right: '-2.5rem',
              top: 'calc(50% - 11px)',
              content: "''",
              width: '22px',
              height: '22px',
            },
            '&.loading': {
              '&:after': {
                animation: 'rotate 1s infinite linear',
                background: 'url(/images/loading.svg) no-repeat',
              },
            },
            '&.available': {
              '&:after': {
                background: 'url(/images/check-circle.svg) no-repeat',
              },
            },
            '&.registered': {
              '&:after': {
                background: 'url(/images/check-circle-green.svg) no-repeat',
              },
            },
            '&.error': {
              input: {
                borderColor: 'rgba(255, 0, 0, 0.5)',
              },
              '&:after': {
                background: 'url(/images/fail.svg) no-repeat',
              },
            },
          },
        }}
      >
        <section>
          <Themed.h4>Location</Themed.h4>
          <p>Point Web3hub to where your package has been uploaded.</p>
          <div className="fieldset">
            <label className="labelEl">IPFS location</label>
            <div className={'inputwrap ' + ipfsClasses}>
              <Input
                type="text"
                name="ipfs"
                placeholder="QmPBWKRhX9aqQh4zsn..."
                required
                pattern="^Qm[1-9A-HJ-NP-Za-km-z]{44}(\/.*)?|^\/ipns\/.+"
                onChange={handleIPFSHashInput}
                value={publish.ipfs}
                disabled={publish.ipfsSuccess}
              />
            </div>
            {publish.ipfsError && <ErrorMsg>{publish.ipfsError}</ErrorMsg>}
          </div>
        </section>
        <section>
          <Themed.h4>Pointer</Themed.h4>
          <p>
            Register your API to an ENS domain that developers will reference when
            integrating.
          </p>
          <div className="fieldset">
            <label className="labelEl">ENS Subdomain</label>
            <div
              className={'inputwrap ' + subdomainClasses}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'max-content !important',
              }}
            >
              
                <Input
                  sx={{ maxWidth: '12rem', pr: '0 !important' }}
                  type="text"
                  name="ens"
                  placeholder="{SUBDOMAIN}"
                  required
                  onChange={handleSubdomainChange}
                  value={publish.subdomain}
                />
              
              <span sx={{ ml: 3 }}>.open.web3.eth</span>
            </div>
            {publish.subdomainError && (
              <ErrorMsg bottomshift>{publish.subdomainError}</ErrorMsg>
            )}
            <p>
              <small>
                This option will cost ~0.0023 ETH ($2.90 USD)
                <br />
                Need ETH?{' '}
                <a
                  href="https://www.moonpay.com/"
                  target="_BLANK"
                  sx={{ color: '#509DAC', textDecoration: 'none' }}
                >
                  Purcahse with your bank or card here
                </a>
              </small>
            </p>
            <br />
            <Button
              variant="primaryMedium"
              onClick={handleRegisterENS}
              disabled={publish.subdomain.length === 0 || status === 3 }
            >
              Register ENS
            </Button>
          </div>
        </section>
        <section>
          <Themed.h4>Publish to Web3Hub</Themed.h4>
          <p>
            Make your package discoverable on the Web3Hub. After publishing, the IPFS
            pacakge will be persistently pinned using Fleek. Learn more
          </p>
          <div className="fieldset">
            <br />
            <Button
              variant="primaryMedium"
              type="submit"
              disabled={publish.subdomain.length === 0 || publish.ipfs.length === 0}
            >
              Publish
            </Button>
          </div>
        </section>
      </form>
      <Flex
        className="preview"
        sx={{
          flex: 3,
          textAlign: 'center',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="title">Package Preview</div>
        <div className="wrapper" sx={{ maxWidth: '17.5rem' }}>
          {publish.apiData && (
            <Card api={publish.apiData} ipfsHash={publish.ipfs} boxShadowOn noHover  />
          )}
        </div>
      </Flex>
    </Flex>
  )
}

export default PublishAPI
