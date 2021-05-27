import { cloudFlareGateway } from '../../constants'
import axios from 'axios'

export default async function getPackageSchema(api) {
  console.log({ api })
  console.log("URL: ", `${cloudFlareGateway}${api.locationUri.split('ipfs/')[1]}/schema.graphql`)
  let schemaResponse = await axios.get(
    `${cloudFlareGateway}${api.locationUri.split('ipfs/')[1]}/schema.graphql`,
  )
  return schemaResponse.data
}
