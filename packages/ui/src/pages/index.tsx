/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import { useStateValue } from '../state/state'

import Layout from '../components/Layout'
import SortNav from '../components/SortNav'
import ApiGrid from '../components/ApiGrid'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BGWave from '../components/BGWave'
import BottomSpace from '../components/BottomSpace'
import Card from '../components/Card'

const Home = () => {
  const [{ dapp, search }] = useStateValue()  
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header title="Browse APIs" />
            <section className="content">
              <SortNav />
              <ApiGrid>
                {search !== undefined && search.sortedApi !== -1 ? (
                  <Card api={search.sortedApi[0]} boxShadowOn />
                ) : (
                  dapp?.apis &&
                  dapp.apis.map((api, idx) => (
                    <Card api={api} boxShadowOn key={idx + '-api'} />
                  ))
                )}
              </ApiGrid>
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
      <BGWave light />
    </Layout>
  )
}

export default Home
