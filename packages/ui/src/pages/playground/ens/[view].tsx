/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import { Global } from '@emotion/react'
import { useRouter } from 'next/router'
import { Web3ApiProvider } from '@web3api/react'
import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import Header from '../../../components/Header'
import Playground from '../../../components/Playground'

import { useGetAPIfromENSParamInURL } from '../../../hooks/ens/useGetAPIfromENS'
import { useStateValue } from '../../../state/state'
import { useEffect } from 'react'
import Modal from '../../../components/Modal'

const PlaygroundPage = () => {
  const router = useRouter()
  const [
    {
      web3api,
      dapp,
      publish: { showSignInModal },
    },
    dispatch,
  ] = useStateValue()
  const [{ data }] = useGetAPIfromENSParamInURL()

  if (router.asPath !== '/playground' && !router.asPath.includes('/playground/ens/')) {
    router.push('/playground')
  }

  useEffect(() => {
    if (!dapp.web3) {
      dispatch({ type: 'setShowSignInModal', payload: true })
    }
  }, [dapp.web3])
  return (
    <Layout>
      <Flex>
        {showSignInModal && !dapp.web3 && (
          <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
            <Modal
              screen={'connect'}
              noLeftShift
              close={() => {
                dispatch({ type: 'setShowConnectModal', payload: false })
              }}
            />{' '}
          </div>
        )}
        <Navbar />
        <main>
          <div className="contents animate">
            <Header onDark title="Playground" />
            {data !== null && web3api.redirects && (
              <Web3ApiProvider redirects={web3api.redirects}>
                <Playground api={data} />
              </Web3ApiProvider>
            )}
          </div>
        </main>
      </Flex>
      <Global
        styles={(theme: any) => {
          return {
            body: {
              background: theme.colors.w3shade0 + ' !important',
            },
          }
        }}
      />
    </Layout>
  )
}

export default PlaygroundPage
