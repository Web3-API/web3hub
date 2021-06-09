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
  }

  private async initialize(provider): Promise<void> {
    try {
      const resolver = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(Auth.ceramic),
      }
      const did = new DID({ resolver })
      await Auth.ceramic.setDID(did)
      const authProvider = new EthereumAuthProvider(provider, provider.selectedAddress)
      const threeIdConnect = new ThreeIdConnect()
      await threeIdConnect.connect(authProvider)
      const didProvider = await threeIdConnect.getDidProvider()
      await Auth.ceramic.did.setProvider(didProvider)
      await Auth.ceramic.did.authenticate()
    } catch (e) {
      console.log('Error doing the connection of ceramic ', e)
    }
  }

  public static async set(key, values): Promise<void> {
    await Auth.idx.set(key, values)
  }

  public static async get(key): Promise<string> {
    return await Auth.idx.get(key)
  }
}
