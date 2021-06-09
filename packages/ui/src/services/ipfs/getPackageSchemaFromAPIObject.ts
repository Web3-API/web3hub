import { cloudFlareGateway } from '../../constants'
import axios from 'axios'

export default async function getPackageSchema(api) {
  let schemaResponse = await axios.get(
    `${cloudFlareGateway}${api.locationUri}/schema.graphql`,
  )
  return schemaResponse.data
}
