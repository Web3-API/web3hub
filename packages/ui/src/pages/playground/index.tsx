/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import { Global } from '@emotion/react'
import { Web3ApiProvider } from '@web3api/react'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import Playground from '../../components/Playground'
import { useStateValue } from '../../state/state'

const PlaygroundPage = () => {
  const [{ web3api }] = useStateValue()
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header onDark title="Playground" />
            {/* {web3api.redirects && (
              <Web3ApiProvider redirects={web3api.redirects}>
                <Playground />
              </Web3ApiProvider>
            )} */}
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
