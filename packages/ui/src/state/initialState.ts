import { PluginPackage, UriRedirect } from '@web3api/client-js'
import ethers from "ethers"
import { networkID } from '../constants'
import { APIData } from '../hooks/ens/useGetAPIfromENS'

export interface State {
  dapp: dappType
  web3api: {
    redirects: {
      from: string
      to: PluginPackage
    }[]
  }
  publish: publishType
  search: searchType
}

export const initialState: State = {
  dapp: {
    balance: "-1",
    address: undefined,
    wallet: {
      name: 'TEST',
    },
    network: networkID,
    web3: undefined,
    apis: [],
    github: '',
    did: undefined,
  },
  web3api: {
    redirects: undefined,
  },
  publish: {
    subdomain: '',
    ipfs: '',
    subdomainError: '',
    subdomainLookupSuccess: false,
    subdomainRegisterSuccess: false,
    subdomainLoading: false,
    ipfsLoading: false,
    ipfsError: '',
    ipfsSuccess: false,
    showConnectModal: false,
    showSignInModal: false,
    showSuccessModal: false,
    apiData: undefined,
    registrationStatus: -1,
  },
  search: {
    sortedApi: [],
  },
}

type dappType = {
  balance: string
  address: string
  wallet: { name: string }
  network: number
  web3?: ethers.providers.JsonRpcProvider
  apis: APIData[]
  github?: string
  did?: string;
}

type web3apiType = {
  redirects: UriRedirect[]
}

type publishType = {
  subdomain: string
  ipfs: string
  subdomainError: string
  subdomainLookupSuccess: boolean
  subdomainRegisterSuccess: boolean
  subdomainLoading: boolean
  ipfsLoading: boolean
  ipfsError: string
  ipfsSuccess: boolean
  showConnectModal: boolean
  showSignInModal: boolean
  showSuccessModal: boolean
  apiData: APIData | undefined
  registrationStatus: number
}

type searchType = {
  sortedApi: -1 | APIData[]
}

export default initialState
export type { dappType }
export type { web3apiType }
export type { publishType }
export type { searchType }
