import axios from 'axios'
import { cloudFlareGateway } from '../constants'
import cheerio from 'cheerio'
import cleaner from 'clean-html'

export default async function get_CFG_UI_DOM(api: any, path: string) {
  let response = await axios.get(`https://cloudflare-ipfs.com/ipfs/${api.locationUri}${path}`)
  let siteURLHTMLClean = ''
  cleaner.clean(response.data, (html) => (siteURLHTMLClean = html))
  let $ = cheerio.load(siteURLHTMLClean)
  return $
}