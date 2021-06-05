import { createEthereumProvider } from './ethereum'
import getOnboard from './Onboarding'

const onboardInit = (dispatch) => {
  return getOnboard({
    address: async (address) => {
      dispatch({
        type: 'SET_ADDRESS',
        payload: address,
      })
      dispatch({
        type: 'recreateredirects',
      })
    },
    network: (network) => {
      dispatch({
        type: 'SET_NETWORK',
        payload: network,
      })
      dispatch({
        type: 'recreateredirects',
      })
    },
    balance: (balance) => {
      dispatch({
        type: 'SET_BALANCE',
        payload: balance,
      })
    },
    wallet: (wallet) => {
      let web3 = wallet.provider && createEthereumProvider(wallet.provider)
      dispatch({
        type: 'SET_WALLET',
        payload: wallet,
      })
      dispatch({
        type: 'SET_WEB3',
        payload: web3,
      })
    },
  })
}

export default onboardInit
