/** @jsxImportSource theme-ui **/
import { useState } from 'react'
import { Flex, Button, useThemeUI } from 'theme-ui'

import { useRouter } from 'next/router'
import { useStateValue } from '../state/state'

import Link from 'next/link'
import Modal from './Modal'

import addrShortener from '../utils/addrShortener'

import User from '../../public/images/user.svg'
import ETHlogoicon from '../../public/images/eth-logo-hollow-icon.svg'
import MyAPIs from '../../public/images/myapis.svg'
import Github from '../../public/images/github-icon-large.svg'


type SignInAreaProps = {
  onDark?: boolean
}

const SignInArea = ({ onDark }: SignInAreaProps) => {
  const [{ dapp }, dispatch] = useStateValue()
  const { theme } = useThemeUI()
  const router = useRouter()
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const handleDisconnect = () => {
    setShowDisconnectModal(true)
  }
  const handleSignIn = () => {
    console.log('s')
    setShowSignInModal(true)
  }
  const handleSignOut = () => {
    setShowSignOutModal(true)
  }

  return (
    <Flex
      className="sign-in-wrap"
      sx={{
        ul: { display: 'flex', color: onDark ? 'white !important' : '' },
        li: { ml: 2 },
      }}
    >
      {showConnectModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'connect'}
            noLeftShift
            close={() => {
              setShowConnectModal(false)
            }}
          />
        </div>
      )}
      {showDisconnectModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'disconnect'}
            noLeftShift
            close={() => {
              setShowDisconnectModal(false)
            }}
          />
        </div>
      )}
      {showSignInModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'connect'}
            noLeftShift
            close={() => {
              setShowSignInModal(false)
            }}
          />
        </div>
      )}
      {showSignOutModal && (
        <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={'signout'}
            noLeftShift
            close={() => {
              setShowSignOutModal(false)
            }}
          />
        </div>
      )}
      <ul sx={{ display: 'flex', alignItems: 'center' }}>
        {dapp?.auth && (
          <li>
            {router.pathname === '/apis/create' ? (
              ''
            ) : (
              <Link href="/apis/user?activeTab=published">
                <a className="header-nav" sx={{ display: 'flex', alignItems: 'center' }}>
                  <MyAPIs
                    stroke={onDark ? 'white' : theme.colors.w3green}
                    sx={{ mr: 2 }}
                  />
                  <span
                    sx={{
                      fontFamily: 'Montserrat',
                      fontSize: '0.875rem',
                      color: onDark ? 'white !important' : 'w3green',
                      fontWeight: '600',
                      lineHeight: '1.0625rem',
                      letterSpacing: '-0.025rem',
                      textAlign: 'left',
                    }}
                  >
                    My APIs
                  </span>
                </a>
              </Link>
            )}
          </li>
        )}

        {dapp.address && (
          <li
            onClick={handleDisconnect}
            className="wallet-addr"
            sx={{
              p: '0.425rem',
              display: 'flex',
              alignItems: 'center',
              svg: {
                stroke: 'whitesmoke',
                strokeWidth: '0.2px',
              },
            }}
          >
            <ETHlogoicon stroke={onDark ? 'white' : theme.colors.w3darkGreen} />
            <span
              className="header-nav"
              sx={{
                ml: 2,
                textTransform: 'initial',
                fontFamily: 'Montserrat',
                fontSize: '0.875rem',
                fontWeight: '600',
                lineHeight: '1.0625rem',
                letterSpacing: '-0.025rem',
                color: onDark ? 'white' : 'w3darkGreen',
                cursor: 'pointer',
              }}
            >
              {dapp.address && addrShortener(dapp.address)}
            </span>
          </li>
        )}

        {!dapp?.github ? (
          <li
            onClick={handleSignIn}
            onKeyUp={handleSignIn}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <User stroke={onDark ? 'white' : theme.colors.w3darkGreen} />
            <span>&nbsp;</span>
            <span
              sx={{
                color: onDark ? 'white' : 'w3darkGreen',
                fontFamily: 'Montserrat',
                fontSize: '0.875rem',
                fontWeight: '600',
                lineHeight: '1.0625rem',
                letterSpacing: '-0.025rem',
              }}
            >
              Sign In
            </span>
          </li>
        ) : (
          <li
            onClick={handleSignOut}
            onKeyUp={handleSignOut}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Github fill={onDark ? 'white' : theme.colors.w3darkGreen} width="40px"/>
            {/* <span>&nbsp;</span>
            <span
              sx={{
                color: onDark ? 'white' : 'w3darkGreen',
                fontFamily: 'Montserrat',
                fontSize: '0.875rem',
                fontWeight: '600',
                lineHeight: '1.0625rem',
                letterSpacing: '-0.025rem',
              }}
            >
            </span> */}
          </li>
        )}

        <li>
          <Button
            variant={
              router.pathname !== '/apis/create' ? 'primaryMedium' : 'secondaryMedium'
            }
            onClick={() => {
              router.pathname !== '/apis/create'
                ? router.push('/apis/create?activeTab=create')
                : router.push('/')
            }}
            sx={{ display: 'inline-block', ml: 3 }}
          >
            {router.pathname !== '/apis/create' ? 'Create New API' : 'Cancel'}
          </Button>
        </li>
      </ul>
    </Flex>
  )
}

export default SignInArea
