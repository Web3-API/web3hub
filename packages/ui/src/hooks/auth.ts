import { useCallback } from 'react'
import { useStateValue } from '../state/state'
import Auth from '../services/ceramic/auth'

export const useSet = () => {
  const [{ dapp }] = useStateValue()
  const set = useCallback(
    async (key, values) => {
      if (Auth.idx.authenticated) {
        if (dapp.web3) {
          await Auth.set(key, values)
          return
        }
        // open connect modal
      }
      await Auth.getInstance(dapp.web3.provider)
    },
    [Auth],
  )

  return set
}

export const useGet = () => (key) => {
  const [{ dapp }] = useStateValue()
  const get = useCallback(async () => {
    if (Auth.idx.authenticated) {
      return await Auth.idx.get(key)
    }
    await Auth.getInstance(dapp.web3.provider)
  }, [Auth])

  return get
}
