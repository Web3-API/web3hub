import axios from 'axios'
import { cloudFlareGateway } from '../constants'
import cheerio from 'cheerio'

const cleaner = require('clean-html')

export default async function get_CFG_UI_DOM(api: any, path: string) {
  let response = await axios.get(`${cloudFlareGateway}${api.locationUri}${path}`)
  let siteURLHTMLClean = ''
  cleaner.clean(response.data, (html: string) => (siteURLHTMLClean = html))
  let $ = cheerio.load(siteURLHTMLClean)
  return $
}