import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { JsonRpcProvider } from '@web3api/client-js/build/pluginConfigs/Ethereum'

const CERAMIC_NODE = process.env.CERAMIC_NODE || 'https://ceramic-clay.3boxlabs.com'

const aliases = {
  authentication: 'kjzl6cwe1jw148u82hnzcxx40jmyv4rkssid4rlhz7mku1rpxtnvf4nu9z2loup',
}

export default class Auth {
  private constructor() {}
  private static _instance: Auth

  public static ceramic: Ceramic = new Ceramic(CERAMIC_NODE)
  public static idx: IDX = new IDX({ ceramic: Auth.ceramic, aliases })

  public static async getInstance(provider?: JsonRpcProvider) {
    if (!this._instance && provider) {
      const instance = new Auth()
      await instance.initialize(provider)
      this._instance = instance
    }
  }

  public static async set(key: string, values: any): Promise<void> {
    await Auth.idx.set(key, values)
  }

  public static async get(key: string): Promise<any> {
    return await Auth.idx.get(key)
  }

  private async initialize(provider: JsonRpcProvider): Promise<void> {
    try {
      const did = this.createDID()
      await Auth.ceramic.setDID(did)
      const didProvider = await this.createBlockchainConnection(provider)
      await Auth.ceramic.did.setProvider(didProvider)
      await Auth.ceramic.did.authenticate()
    } catch (e) {
      console.log('Error doing the connection of ceramic ', e)
    }
  }

  private createDID() {
    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(Auth.ceramic),
    }
    const did = new DID({ resolver })
    return did
  }

  private async createBlockchainConnection(provider: any) {
    const authProvider = new EthereumAuthProvider(provider, provider.selectedAddress)
    const threeIdConnect = new ThreeIdConnect()
    await threeIdConnect.connect(authProvider)
    const didProvider = await threeIdConnect.getDidProvider()

    return didProvider
  }
}
