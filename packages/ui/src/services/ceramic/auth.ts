import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

const CERAMIC_NODE = process.env.CERAMIC_NODE || 'https://ceramic-clay.3boxlabs.com'

export default class Auth {
  private constructor() {}
  private static _instance: Auth

  public static ceramic: Ceramic = new Ceramic(CERAMIC_NODE)
  public static idx: IDX = new IDX({ ceramic: Auth.ceramic })

  public static async getInstance(provider?: any) {
    if (!this._instance && provider) {
      const instance = new Auth()
      await instance.initialize(provider)
      this._instance = instance
    }
    return this._instance
  }

  private async initialize(provider): Promise<IDX> {
    try {
      const resolver = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(Auth.ceramic),
      }
      const did = new DID({ resolver })
      console.log('This is the DID')
      await Auth.ceramic.setDID(did)

      console.log('We set the DID!!')
      const authProvider = new EthereumAuthProvider(provider, provider.selectedAddress)

      console.log('Auth provider: ', authProvider)
      const threeIdConnect = new ThreeIdConnect()

      console.log({ threeIdConnect })
      await threeIdConnect.connect(authProvider)

      console.log('Three ID Connect, connected :-D')
      const didProvider = await threeIdConnect.getDidProvider()

      console.log('We already get the DID provider: ', didProvider)
      await Auth.ceramic.did.setProvider(didProvider)

      console.log('DID provider set')

      
      await Auth.ceramic.did.authenticate()

      console.log('DID authenticated :-D')
      return Auth.idx
    } catch (e) {
      console.log('Error doing the connection of ceramic ', e)
    }
  }

  public static async set(key, values): Promise<void> {
    if (!this.idx.authenticated) {
      throw new Error('User is not authenticated')
    }
    await this.idx.set(key, values)
  }

  public static async get(key): Promise<string> {
    return await this.idx.get(key)
  }
}
