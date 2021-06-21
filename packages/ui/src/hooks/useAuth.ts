import { useCallback, useEffect } from 'react'
import { JWE } from 'did-jwt';
import Auth from '../services/ceramic/auth'
import { githubHandler } from '../services/ceramic/handlers'
import { State } from '../state/initialState'
import { useStateValue } from '../state/state'

export const useAuth = (dapp: State["dapp"]) => {
  const [state, dispatch] = useStateValue()
  const { github: cachedToken } = state.dapp
  const isAuthenticated = Auth.ceramic.did?.authenticated

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        const auth = await Auth.get('authentication')
        const tokenFromIDX: JWE = auth && (auth as Record<string, any>)['github']?.accessToken
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
      await Auth.getInstance(dapp.web3)
    },
    [Auth, dapp],
  )

  const get = useCallback(
    async (key: string) => {
      if (Auth.idx.authenticated) {
        return await Auth.get(key)
      }
      await Auth.getInstance(dapp.web3)
    },
    [Auth, dapp],
  )

  return { set, get }
}
