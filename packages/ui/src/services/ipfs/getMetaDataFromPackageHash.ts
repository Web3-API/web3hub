import axios from 'axios'
import { cloudFlareGateway } from '../../constants'

const yaml = require('js-yaml')

export default async function getMetaDataFromPackageHash(hash: string) {
  let ipfsDataFromJSON = null
  let ipfsDataFromYAML = null
  let ipfsData = null

  try {
    ipfsDataFromJSON = await axios.get(
      cloudFlareGateway + hash + '/web3api.meta.json'
    )
    ipfsData = ipfsDataFromJSON.data
  } catch (error) {
    console.log(error)
  }
  try {
    ipfsDataFromYAML = await axios.get(
      cloudFlareGateway + hash + '/web3api.meta.yaml'
    )
    ipfsData = ipfsDataFromYAML.data
  } catch (error) {
    console.log(error)
  }

  if (ipfsDataFromJSON === null && ipfsDataFromYAML === null) {
    return 'NO METADATA FOUND'
  } else {
    try {
      const doc = yaml.load(ipfsData)
      return doc
    } catch (error) {
      console.log(error)
    }
  }
}
