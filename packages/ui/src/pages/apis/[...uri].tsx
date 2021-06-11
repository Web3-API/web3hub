/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import BottomSpace from '../../components/BottomSpace'
import APIDetail from '../../components/APIDetail'
import { useGetAPIfromURLPATH } from '../../hooks/ens/useGetAPIfromURLPATH'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ApiView = () => {
  const [data, setdata] = useState(null)
  const router = useRouter()
  useEffect(() => {
    setdata(useGetAPIfromURLPATH(router))
  }, [router.query])
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header backNav={`Browse API's`} />
            {data !== null && <APIDetail api={data} />}
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default ApiView
