/** @jsxImportSource theme-ui **/
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'theme-ui'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ContentNav from '../../components/ContentNav'
import Published from '../../components/tabs/Published'
import Favorites from '../../components/tabs/Favorites'
import BottomSpace from '../../components/BottomSpace'

const UserApis = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(router.query.activeTab as string)
  useEffect(() => {
    setActiveTab(router.query.activeTab as string)
  }, [router.query.activeTab])
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header title="My API's" />
            <section className="content">
              <ContentNav
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tabs={[
                  {
                    label: 'Published',
                    count: 0,
                  },
                  {
                    label: 'Favorites',
                    count: 12,
                  },
                ]}
              />
              <br />
              {activeTab === 'published' && <Published />}
              {activeTab === 'favorites' && <Favorites />}
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default UserApis
