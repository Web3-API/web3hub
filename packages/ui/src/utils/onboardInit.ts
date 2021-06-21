import { createEthereumProvider } from './ethereum'
import getOnboard from './Onboarding'
import Auth from '../services/ceramic/auth'

const onboardInit = (dispatch) => {
  return getOnboard({
    address: async (address) => {
      dispatch({
        type: 'SET_ADDRESS',
        payload: address,
      })
    },
    network: (network) => {
      dispatch({
        type: 'SET_NETWORK',
        payload: network,
      })
    },
    balance: (balance) => {
      dispatch({
        type: 'SET_BALANCE',
        payload: balance,
      })
    },
    wallet: async (wallet) => {
      const web3 = wallet.provider && createEthereumProvider(wallet.provider)
      localStorage.setItem('selectedWallet', wallet.name)
      await Auth.getInstance(wallet.provider)

      if (Auth.ceramic.did?.authenticated) {
        // do a request to backend sending the DID
        // the backend will hash this DID and store it
        const test = await Auth.get('cryptoAccounts')
        console.log(test)
      }

      dispatch({
        type: 'SET_WALLET',
        payload: wallet,
      })
      dispatch({
        type: 'SET_WEB3',
        payload: web3,
      })
      dispatch({
        type: 'recreateredirects',
      })
    },
  })
}

export default onboardInit
