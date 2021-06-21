import { useCallback, useEffect } from 'react'
import Auth from '../services/ceramic/auth'
import { githubHandler } from '../services/ceramic/handlers'
import { useStateValue } from '../state/state'

export const useAuth = (dapp) => {
  const [state, dispatch] = useStateValue()
  const { github: cachedToken } = state.dapp
  const isAuthenticated = Auth.ceramic.did?.authenticated

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        const auth = await Auth.get('authentication')
        const tokenFromIDX = auth && auth['github']?.accessToken
        await githubHandler(tokenFromIDX, cachedToken, dispatch)
      }
    })()
  }, [isAuthenticated, cachedToken])

  const set = useCallback(
    async (key, values) => {
      if (Auth.idx.authenticated) {
        if (dapp.web3) return await Auth.set(key, values)
        // open connect modal
        return
      }
      console.log('its happening here in set useAuth')
      await Auth.getInstance(dapp.web3.provider)
    },
    [Auth, dapp],
  )

  const get = useCallback(
    async (key: string) => {
      if (Auth.idx.authenticated) {
        return await Auth.get(key)
      }
      console.log('its happening here in get useAuth')
      await Auth.getInstance(dapp.web3.provider)
    },
    [Auth, dapp],
  )

  return { set, get }
}
