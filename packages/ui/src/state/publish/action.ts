import { APIData } from "../../hooks/ens/useGetAPIfromENS"

export type PublishAction =
  | SET_SUBDOMAIN
  | SET_IPFS
  | SET_SUBDOMAIN_ERROR
  | SET_SUBDOMAIN_LOOKUP_SUCCESS
  | SET_SUBDOMAIN_REGISTER_SUCCESS
  | SET_SUBDOMAIN_LOADING
  | SET_IPFS_LOADING
  | SET_IPFS_ERROR
  | SET_IPFS_SUCCESS
  | SET_SHOW_CONNECT_MODAL
  | SET_SHOW_SIGNIN_MODAL
  | SET_SHOW_SUCCESS_MODAL
  | SET_API_DATA
  | SET_REGISTRATION_STATUS

type SET_SUBDOMAIN = {
  type: 'setsubdomain'
  payload: string
}

type SET_IPFS = {
  type: 'setipfs'
  payload: string
}

type SET_SUBDOMAIN_ERROR = {
  type: 'setsubdomainError'
  payload: string
}

type SET_SUBDOMAIN_LOOKUP_SUCCESS = {
  type: 'setsubdomainLookupSuccess'
  payload: boolean
}

type SET_SUBDOMAIN_REGISTER_SUCCESS = {
  type: 'setsubdomainRegisterSuccess'
  payload: boolean
}

type SET_SUBDOMAIN_LOADING = {
  type: 'setsubdomainLoading'
  payload: boolean
}

type SET_IPFS_LOADING = {
  type: 'setipfsLoading'
  payload: boolean
}

type SET_IPFS_ERROR = {
  type: 'setipfsError'
  payload: string
}

type SET_IPFS_SUCCESS = {
  type: 'setipfsSuccess'
  payload: boolean
}

type SET_SHOW_CONNECT_MODAL = {
  type: 'setShowConnectModal'
  payload: boolean
}

type SET_SHOW_SIGNIN_MODAL = {
  type: 'setShowSignInModal'
  payload: boolean
}

type SET_SHOW_SUCCESS_MODAL = {
  type: 'setShowSuccessModal'
  payload: boolean
}

type SET_API_DATA = {
  type: 'setApiData'
  payload: APIData
}

type SET_REGISTRATION_STATUS = {
  type: 'registrationStatus'
  payload: number
}
