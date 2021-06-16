import { StateAction } from './action'
import { DAppAction, dappReducer } from './dapp'
import { State } from './initialState'
import { PublishAction, publishReducer } from './publish'
import { SearchAction, searchReducer } from './search'
import { web3apiReducer, Web3APIReducerAction } from './web3api'

export default function mainReducer(w3hubStates: State, action: StateAction): State {
  // middleware goes here, i.e calling analytics service, etc.
  // localStorage.setItem('w3hubStates.publish', JSON.stringify(w3hubStates.publish))
  return {
    dapp: dappReducer(w3hubStates, action as DAppAction),
    web3api: web3apiReducer(w3hubStates, action as Web3APIReducerAction),
    publish: publishReducer(w3hubStates, action as PublishAction),
    search: searchReducer(w3hubStates, action as SearchAction),
  }
}
