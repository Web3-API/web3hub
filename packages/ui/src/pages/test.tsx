/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BGWave from '../components/BGWave'
import BottomSpace from '../components/BottomSpace'
import cleanSchema from '../utils/cleanSchema'

import dynamic from 'next/dynamic'
const GQLCodeBlock = dynamic(() => import('../components/GQLCodeBlock'), { ssr: false })

const schemaExample =
  '### Web3API Header START ###\nscalar UInt\nscalar UInt8\nscalar UInt16\nscalar UInt32\nscalar UInt64\nscalar Int\nscalar Int8\nscalar Int16\nscalar Int32\nscalar Int64\nscalar Bytes\n\ndirective @imported(\n  uri: String!\n  namespace: String!\n  nativeType: String!\n) on OBJECT | ENUM\n\ndirective @imports(\n  types: [String!]!\n) on OBJECT\n### Web3API Header END ###\n\ntype Query @imports(\n  types: [\n    "Ethereum_Query"\n  ]\n) {\n  getData(\n    address: String!\n  ): UInt32!\n}\n\ntype Mutation @imports(\n  types: [\n    "Ethereum_Mutation"\n  ]\n) {\n  setData(\n    options: SetDataOptions!\n  ): SetDataResult!\n\n  deployContract: String!\n}\n\ntype SetDataOptions {\n  address: String!\n  value: UInt32!\n}\n\ntype SetDataResult {\n  txReceipt: String!\n  value: UInt32!\n}\n\n### Imported Queries START ###\n\ntype Ethereum_Query @imported(\n  uri: "w3://ens/ethereum.web3api.eth",\n  namespace: "Ethereum",\n  nativeType: "Query"\n) {\n  callView(\n    address: String!\n    method: String!\n    args: [String!]!\n  ): String!\n}\n\ntype Ethereum_Mutation @imported(\n  uri: "w3://ens/ethereum.web3api.eth",\n  namespace: "Ethereum",\n  nativeType: "Mutation"\n) {\n  sendTransaction(\n    address: String!\n    method: String!\n    args: [String!]!\n  ): String!\n\n  deployContract(\n    abi: String!\n    bytecode: String!\n  ): String!\n}\n\n### Imported Queries END ###\n\n### Imported Objects START ###\n\n### Imported Objects END ###\n'

const Test = () => {  
  const {
    localqueries,
    localmutations,
    localcustom,
    importedqueries,
    importedmutations,
  } = cleanSchema(schemaExample)
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header title="Test page" />
            <hr />
            <section>
              <GQLCodeBlock title="Queries" value={localqueries}/>
              <GQLCodeBlock title="Mutations" value={localmutations}/>
              <GQLCodeBlock title="Custom Types" value={localcustom}/>
              <GQLCodeBlock title="Imported Queries" value={importedqueries}/>
              <GQLCodeBlock title="Imported Mutations" value={importedmutations}/>
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
      <BGWave light />
    </Layout>
  )
}

export default Test
