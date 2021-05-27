/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import { Global } from '@emotion/react'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import Playground from '../../components/Playground'

const PlaygroundPage = () => {
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header onDark title="Playground" />
            <Playground/>
          </div>
        </main>
      </Flex>
      <Global
        styles={(theme) => ({
          body: {
            background: 'none' + ' !important',
            backgroundColor: 'w3shade0',
          },
        })}
      />
    </Layout>
  )
}

export default PlaygroundPage
