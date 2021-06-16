import { State } from '../initialState'
import { Web3APIReducerAction } from './action'
import networks from '../../utils/networks.json'
import { networkID } from '../../constants'
import { ConnectionConfig, ethereumPlugin } from '@web3api/ethereum-plugin-js'
import { ipfsPlugin } from '@web3api/ipfs-plugin-js'
import { ensPlugin } from '@web3api/ens-plugin-js'

export function web3apiReducer(
  state: State,
  action: Web3APIReducerAction,
): State['web3api'] {
  switch (action.type) {
    case 'recreateredirects':
      const currentNetwork = networks[networkID]
      const networksConfig: Record<string, ConnectionConfig> = {
        [currentNetwork.name]: {
          provider: state.dapp.web3,
          signer: state.dapp.web3.getSigner(),
        },
      }
      const redirects = [
        {
          from: 'w3://ens/ethereum.web3api.eth',
          to: ethereumPlugin({
            networks: networksConfig,
            defaultNetwork: currentNetwork.name,
          }),
        },
        {
          from: 'w3://ens/ipfs.web3api.eth',
          to: ipfsPlugin({ provider: 'https://ipfs.io' }),
        },
        {
          from: 'w3://ens/ens.web3api.eth',
          to: ensPlugin({}),
        },
      ]

      return {
        ...state.web3api,
        redirects,
      }
    default:
      return state.web3api
  }
}
