/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import Header from '../../../components/Header'
import BottomSpace from '../../../components/BottomSpace'
import APIDetail from '../../../components/APIDetail'
import { useGetAPIfromENSParamInURL } from '../../../hooks/ens/useGetAPIfromENS'

const ApiView = () => {
  const [{data}] = useGetAPIfromENSParamInURL()
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header backNav={`Browse API's`} />
            {!!data && <APIDetail api={data} />}
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default ApiView
