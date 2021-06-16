import { APIData } from "../../hooks/ens/useGetAPIfromENS"

export type DAppAction =
  | SET_ADDRESS_ACTION
  | SET_NETWORK_ACTION
  | SET_BALANCE_ACTION
  | SET_WALLET_ACTION
  | SET_WEB3_ACTION
  | SET_AVAILABLE_APIS_ACTION
  | SET_AVAILABLE_APIS_ACTION
  | SET_GITHUB_USER_ACTION

type SET_ADDRESS_ACTION = {
  type: 'SET_ADDRESS'
  payload: string
}

type SET_NETWORK_ACTION = {
  type: 'SET_NETWORK'
  payload: number
}

type SET_BALANCE_ACTION = {
  type: 'SET_BALANCE'
  payload: string
}

type SET_WALLET_ACTION = {
  type: 'SET_WALLET'
  payload: {
    name: string;
  }
}

type SET_WEB3_ACTION = {
  type: 'SET_WEB3'
  payload: any
}

type SET_AVAILABLE_APIS_ACTION = {
  type: 'SET_AVAILABLE_APIS'
  payload: APIData[]
}

type SET_GITHUB_USER_ACTION = {
  type: 'SET_GITHUB_USER'
  payload: string
}
