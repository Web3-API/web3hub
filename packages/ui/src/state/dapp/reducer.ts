import { DAppAction } from "."
import { State, initialState } from "../initialState"

export function dappReducer(state: State, action: DAppAction): State["dapp"] {
  let newStateObj: State["dapp"] = initialState.dapp

  switch (action.type) {
    case 'SET_ADDRESS':
      newStateObj.address = action.payload
      return newStateObj
    case 'SET_NETWORK':
      newStateObj.network = action.payload
      return newStateObj
    case 'SET_BALANCE':
      newStateObj.balance = action.payload
      return newStateObj
    case 'SET_WALLET':
      newStateObj.wallet = action.payload
      return newStateObj
    case 'SET_WEB3':
      newStateObj.web3 = action.payload
      return newStateObj
    case 'SET_AVAILABLE_APIS':
      newStateObj.apis = action.payload
      return newStateObj
    case 'SET_GITHUB_USER':
      newStateObj.github = action.payload
      return newStateObj
    default:
      return state.dapp
  }
}