import Auth from './auth'

// We can add custom logic for each web2 service that we want to
// support on the Web3Hub

export const githubHandler = async (tokenFromIDX, cachedToken, dispatch) => {
  const tokenIsCached = !!cachedToken

  // If token is stored in local state but not in IDX, update IDX state
  // This is needed because for GitHub auth
  // there's a redirect to their site
  if (!tokenFromIDX && tokenIsCached) {
    const params = {
      github: { accessToken: cachedToken },
    }
    await Auth.set('authentication', params)
    return
  }

  // If token is stored in IDX, update local state
  // This will allow the user to refresh the app, and
  // when it connects automatically to the blockchain provider
  // it should be able to access this token in an easy way
  if (tokenFromIDX && !tokenIsCached) {
    dispatch({
      type: 'SET_GITHUB_USER',
      payload: tokenFromIDX,
    })
  }
}
