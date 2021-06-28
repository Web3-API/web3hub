import axios from 'axios'
import { createEthereumProvider } from './ethereum'
import getOnboard from './Onboarding'
import Auth from '../services/ceramic/auth'
import { Dispatch } from 'react'
import { StateAction } from '../state/action'

const onboardInit = (dispatch: Dispatch<StateAction>) => {
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

      await Auth.getInstance(wallet.provider)

      if (Auth.ceramic.did?.authenticated) {
        // do a request to backend sending the DID
        // the backend will hash this DID and store it
        const { id } = Auth.ceramic.did
        await axios.post(`http://localhost:3000/api/auth/sign-in`, {
          did: id,
        })
        console.log({ id })
        dispatch({
          type: 'SET_DID',
          payload: id,
        })
      }
    },
  })
}

export default onboardInit
