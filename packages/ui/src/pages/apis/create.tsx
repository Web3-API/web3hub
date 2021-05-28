/** @jsxImportSource theme-ui **/
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Themed } from 'theme-ui'
import Layout from '../../components/Layout'
import CreateAPI from '../../components/tabs/CreateAPI'
import PublishAPI from '../../components/tabs/PublishAPI'
import Header from '../../components/Header'
import BottomSpace from '../../components/BottomSpace'

const CreateApi = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(router.query.activeTab)
  const handleTabClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation()
    setActiveTab(e.target.classList[1])
  }
  useEffect(() => {
    setActiveTab(router.query.activeTab)
  }, [router.query.activeTab])
  return (
    <Layout>
      <Flex>
        <main sx={{ pb: 5 }}>
          <div className="contents" sx={{ maxWidth: 'calc(76.5rem + 112px)' }}>
            <Header title={'Create a Web3API'}/>
            <Flex
              className="tabs"
              onClick={handleTabClick}
              sx={{
                '*': { cursor: 'pointer', mr: 2, mb: 4 },
                '.tab': {
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  lineHeight: '1.25rem',
                  letterSpacing: '-0.025rem',
                  pb: ' 1.125rem',
                  color: 'text',
                  mb: 0,
                  '&.active': {
                    fontWeight: 'bold',
                    color: 'w3darkGreen',
                    borderBottom: '0.125rem solid',
                    borderBottomColor: 'w3NavNeonHighlightTeal',
                    '&:hover': {
                      borderBottom: '0.125rem solid',
                      borderBottomColor: 'w3NavNeonHighlightTeal',
                    },
                  },
                  '&:hover': {
                    borderBottom: '0.125rem solid',
                    borderBottomColor: 'background',
                  },
                },
              }}
            >
              <Themed.h3
                className={'tab create ' + (activeTab === 'create' ? 'active' : '')}
                sx={{ flex: 1 }}
              >
                Create
              </Themed.h3>
              <Themed.h3
                className={'tab publish ' + (activeTab === 'publish' ? 'active' : '')}
                sx={{ flex: 1 }}
              >
                Publish
              </Themed.h3>
            </Flex>
            <div
              className="tab-content"
              sx={{
                bg: 'white',
                '> *': {
                  px: '3.4375rem',
                  pt: '5.625rem',
                },
              }}
            >
              {activeTab === 'create' && <CreateAPI />}
              {activeTab === 'publish' && <PublishAPI />}
            </div>
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default CreateApi
