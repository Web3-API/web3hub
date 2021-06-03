import axios from 'axios'
import { cloudFlareGateway } from '../../constants'
import get_CFG_UI_DOM from '../../utils/get_CFG_UI_DOM'

export default async function getPackageQueries(api) {
  let $ = await get_CFG_UI_DOM(api, '/meta/queries')
  let queries = Array.from($('table tr td:nth-child(2) a'))
  queries.shift() // dump .. in row 1
  let queriesList = []
  await queries.map((row: any) => {
    async function getQueries() {
      let queryData = await axios.get(
        `${cloudFlareGateway.replace('/ipfs/', '')}${row.attribs.href}`,
      )
      let key = row.attribs.href.split('meta/queries/')[1].split('.graphql')[0]
      await queriesList.push({ id: key, value: queryData.data })
    }
    getQueries()
  })
  return queriesList
}
