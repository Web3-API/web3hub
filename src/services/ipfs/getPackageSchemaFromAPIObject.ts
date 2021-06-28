import { cloudFlareGateway } from '../../constants'
import axios from 'axios'
import { APIData } from '../../hooks/ens/useGetAPIfromENS'

export default async function getPackageSchema(api: APIData): Promise<string> {
  let schemaResponse = await axios.get(
    `${cloudFlareGateway}${api.locationUri}/schema.graphql`,
  )
  return schemaResponse.data
}
