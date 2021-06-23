import { Dispatch } from 'react'
import { JWE } from 'did-jwt';
import { DAppAction } from '../../state/action'
import Auth from './auth'

// We can add custom logic for each web2
// service that we want to
// support on the Web3Hub
export const githubHandler = async (tokenFromIDX: JWE, cachedToken: string, dispatch: Dispatch<DAppAction>) => {
  const tokenIsCached = !!cachedToken

  // If token is stored in local state but not in IDX, update IDX state
  // This is needed because for GitHub auth
  // there's a redirect to their site
  if (!tokenFromIDX && tokenIsCached) {
    const encoder = new TextEncoder()
    const encodedToken = encoder.encode(cachedToken)
    const jwe = await Auth.idx.ceramic.did.createJWE(encodedToken, [
      Auth.idx.ceramic.did.id,
    ])
    const params = {
      github: { accessToken: jwe },
    }

    await Auth.set('authentication', params)
    return
  }

  // If token is stored in IDX, update local state
  // This will allow the user to refresh the app, and
  // when it connects to the blockchain provider
  // the token will be loaded locally
  if (tokenFromIDX && !tokenIsCached) {
    const token = await Auth.idx.ceramic.did.decryptJWE(tokenFromIDX)
    const encoder = new TextDecoder()
    const decoded = encoder.decode(token)
    dispatch({
      type: 'SET_GITHUB_USER',
      payload: decoded,
    })
  }
}
