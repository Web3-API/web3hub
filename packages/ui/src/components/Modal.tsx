/** @jsxImportSource theme-ui **/
import React from 'react'
import { Flex, Button, Themed } from 'theme-ui'
import Image from 'next/image'
import Close from '../../public/images/close.svg'
import onboardInit from '../utils/onboardInit'
import { useStateValue } from '../state/state'
import { useRouter } from 'next/router'
import Github from '../../public/images/github-icon-large.svg'

type ModalProps = {
  screen: string
  noLeftShift?: boolean
  data?: any
  close?: () => void
}

const Modal = ({ screen = 'connect', close, noLeftShift, data }: ModalProps) => {
  const [{ dapp }, dispatch] = useStateValue()
  const router = useRouter()
  const onboard: any = onboardInit(dispatch)

  const CloseButton = (
    <Close
      className="modal-close-btn"
      onClick={close}
      sx={{
        position: 'absolute',
        right: 4,
        top: 4,
        fill: '#597980',
        '&:hover': {
          fill: 'white',
          cursor: 'pointer',
        },
      }}
    />
  )

  const handleConnect = async () => {
    let selected = await onboard.walletSelect()
    if (selected) {
      await onboard.walletCheck()
      close()
    }
  }

  const handleDisconnect = async () => {
    onboard.walletReset()
    close()
  }

  const handleSignOut = () => {
    dispatch({
      type: 'SET_GITHUB_USER',
      payload: '',
    })
    close()
  }

  return (
    <Flex
      className="overlay"
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 10000,
        background: 'rgba(0,0,0,.4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          width: '39.375rem',
          height: '35.625rem',
          top: '0rem',
          left: noLeftShift ? '0rem' : '-7rem',
          backgroundColor: 'w3darkGreen',
          boxShadow: '0rem 1.5625rem 2.5rem rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
          pt: '2.1875rem',
          pb: '4.375rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000000,
          px: 5,
        }}
      >
        {screen === 'connect' && (
          <React.Fragment>
            {close ? CloseButton : null}
            <Image
              src="/images/eth-logo-hollow-large.svg"
              alt="eth-logo-hollow-large"
              width={140}
              height={140}
            />
            <Themed.h1
              sx={{
                color: 'white',
                fontSize: '2.75rem',
                fontWeight: 'bold',
                pt: 4,
                mb: 2,
              }}
            >
              Connect wallet
            </Themed.h1>
            <Themed.h4
              sx={{
                maxWidth: '80%',
                color: 'white',
                pb: 3,
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '160%',
                textAlign: 'center',
              }}
            >
              Please connect an ethereum wallet to continue.
            </Themed.h4>
            <Button variant="calloutLarge" onClick={handleConnect}>
              Connect
            </Button>
          </React.Fragment>
        )}
        {screen === 'disconnect' && (
          <React.Fragment>
            {close ? CloseButton : null}
            <Image
              src="/images/eth-logo-hollow-large.svg"
              alt="/eth-logo-hollow-large"
              width={140}
              height={140}
            />
            <Themed.h1
              sx={{
                color: 'white',
                fontSize: '2.75rem',
                fontWeight: 'bold',
                pt: 4,
                mb: 2,
              }}
            >
              Wallet Connected
            </Themed.h1>
            <Themed.h4
              sx={{
                maxWidth: '80%',
                color: 'white',
                pb: 3,
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '160%',
                textAlign: 'center',
              }}
            >
              Address: {dapp.address}
            </Themed.h4>
            <Button variant="calloutLarge" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </React.Fragment>
        )}
        {screen === 'signin' && (
          <React.Fragment>
            {close ? CloseButton : null}

            <Github fill={'white'} width="140px" />
            <Themed.h1
              sx={{
                color: 'white',
                fontSize: '2.75rem',
                fontWeight: 'bold',
                pt: 4,
                mb: 2,
              }}
            >
              Sign in
            </Themed.h1>
            <Themed.h4
              sx={{
                maxWidth: '80%',
                color: 'white',
                pb: 3,
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '160%',
                textAlign: 'center',
              }}
            >
              Please sign in with GitHub to continue.
            </Themed.h4>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=c0b5102af0262717b743&scope=read:user read:org`}
              onClick={() => {
                localStorage.setItem('w3hubLastURLb4Signin', router.asPath)
              }}
            >
              <Button variant="calloutLarge">Sign in with github</Button>
            </a>
          </React.Fragment>
        )}
        {screen === 'signout' && (
          <React.Fragment>
            {close ? CloseButton : null}
            <Image src="/images/signout.svg" alt="signout" width={140} height={140} />
            <Themed.h1
              sx={{
                color: 'white',
                fontSize: '2.75rem',
                fontWeight: 'bold',
                pt: 4,
                mb: 2,
              }}
            >
              Sign out
            </Themed.h1>
            <Themed.h4
              sx={{
                maxWidth: '80%',
                color: 'white',
                pb: 3,
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '160%',
                textAlign: 'center',
              }}
            >
              Would you like to sign out of github?
            </Themed.h4>
            <Button variant="calloutLarge" onClick={handleSignOut}>
              Sign out
            </Button>
          </React.Fragment>
        )}
        {screen === 'success' && (
          <React.Fragment>
            {close ? CloseButton : null}
            <img src="/images/trophy.svg" alt="trophy" sx={{ width: '13.75rem' }} />
            <Themed.h1
              sx={{
                color: 'white',
                fontSize: '2.75rem',
                fontWeight: 'bold',
                pt: 4,
                mb: 2,
              }}
            >
              Success!
            </Themed.h1>
            <Themed.h4
              sx={{
                maxWidth: '80%',
                color: 'white',
                pb: 3,
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '160%',
                textAlign: 'center',
              }}
            >
              Package now live on the Web3Hub!
            </Themed.h4>
            <Button
              variant="calloutLarge"
              onClick={() => router.push(`/apis/ens/${data}`)}
            >
              View API
            </Button>
          </React.Fragment>
        )}
      </Flex>
    </Flex>
  )
}

export default Modal
