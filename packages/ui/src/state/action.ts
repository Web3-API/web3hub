import { DAppAction } from './dapp'
import { PublishAction } from './publish'
import { SearchAction } from './search'
import { Web3APIReducerAction } from './web3api'

export type StateAction = Web3APIReducerAction | SearchAction | PublishAction | DAppAction