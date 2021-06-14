import { UriRedirect } from '@web3api/client-js'
import { networkID } from '../constants'

let initialState = {
  dapp: {
    balance: -1,
    address: undefined,
    wallet: {
      name: 'TEST',
    },
    network: networkID,
    web3: undefined,
    apis: [],
    github: '',
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
    apiData: null,
    registrationStatus: -1,
  },
  search: {
    sortedApi: -1,
  },
}

type dappType = {
  balance: number
  address: string
  wallet: { name: string }
  network: number
  web3?: any
  apis: any[]
  github?: string
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
  apiData: any
  registrationStatus: number
}

type searchType = {
  sortedApi: any
}

export default initialState
export type { dappType }
export type { web3apiType }
export type { publishType }
export type { searchType }
