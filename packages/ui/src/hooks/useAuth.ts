import { useCallback } from 'react'
import Auth from '../services/ceramic/auth'

const KEY = 'kjzl6cwe1jw14axqyvaaso092e7gbhas7nb86cphpvlgug09vebhkm12521acs4'

export const useAuth = (dapp) => {
  const set = useCallback(
    async (key, values) => {
      if (Auth.idx.authenticated) {
        if (dapp.web3) {
          // const payload = Uint8Array.from(values)
          // const jwe = await Auth.idx.ceramic.did.createJWE(payload, [
          //   Auth.idx.ceramic.did.id,
          // ])

          // console.log('this is the jwe on set method: ', jwe)
          // await Auth.idx.set(KEY, jwe)
          await Auth.set(key, values)
          console.log('payload has been set')
          return
        }
        // open connect modal
      }
      await Auth.getInstance(dapp.web3.provider)
    },
    [Auth, dapp],
  )

  const get = useCallback(
    async (key?: string) => {
      if (Auth.idx.authenticated) {
        if (key) {
          return await Auth.get(key)
        }
        const jwe = await Auth.get(KEY)
        console.log('this is the jwe on get method: ', jwe)
        return jwe ? await Auth.idx.ceramic.did.decryptJWE(jwe as any) : null
      }
      await Auth.getInstance(dapp.web3.provider)
    },
    [Auth, dapp],
  )

  return { set, get }
}
